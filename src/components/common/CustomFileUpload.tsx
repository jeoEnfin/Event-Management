import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { COLORS } from '../../constants';
import { base64ToArrayBuffer, generateId, getMimeTypesFromExtensions, getOnePendingFileIdFromFileQueue, sanitizeFilename, stringToBinary } from '../../utils/helper/fileUploadHelper';
import axios, { CancelTokenSource } from 'axios';
import axiosClient from '../../utils/services/AxiosServices';
import { config } from '../../utils/config';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toast/ToastActions';

interface CustomFileUploadProps {
  id: string;
  label?: string;
  placeholder?: string;
  onFileSelect?: (file: DocumentPickerResponse | DocumentPickerResponse[]) => void;
  errorText?: string;
  allowedTypes?: string[] | 'all';
  maxSizeInMB?: number;
  multiple?: boolean;
  beginUpload?: boolean;
  autoUpload?: boolean;
  onSelect?: (state: FileSelection) => void;
  onFileUploadComplete?: (result: { status: string; message: string; data: any; id: string }) => void;
  onAllUploadComplete?: () => void;
  uploadPath?: string;
  onProgress?: (result: { progress: number, file: File, id: string }) => void;
  fileName?: string;
  custom?: boolean;
  children?: ReactNode;
  showAlerts?: boolean;
}

interface FileSelection {
  identifier: string;
  files: { [key: string]: { id: string; file: File } };
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  id,
  label,
  placeholder,
  onFileSelect,
  errorText,
  allowedTypes = 'all',
  maxSizeInMB = 5,
  multiple = false,
  beginUpload: startUpload = false,
  autoUpload = true,
  onSelect,
  onFileUploadComplete,
  onAllUploadComplete,
  uploadPath,
  onProgress,
  fileName,
  custom = false,
  children,
  showAlerts = true,
}) => {
  const dispatch : any = useDispatch();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [STATUS] = useState<{ [key: string]: string }>({
    "PENDING": "pending",
    "PROGRESS": "progress",
    "DONE": "done",
    "CANCELLED": "cancelled",
    "ERROR": "error",
    "SUCCESS": "success"
  });
  const [fileQueue, setFileQueue] = useState<{ [key: string]: { name: string; progress: number; id: string; status: string } }>({});
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: { id: string; file: File } }>({});
  const [launchUpload, setLaunchUpload] = useState<boolean>(startUpload);
  const [processQueue, setProcessQueue] = useState<any[]>([]);
  const [maxUploadLimit] = useState<Number>(2);
  const [browse, setBrowse] = useState<boolean>(true);
  const [debug] = useState<boolean>(true);
  const [cancelTokens, setCancelTokens] = useState<{ [key: string]: CancelTokenSource }>({});
  const [imageData, setImageData] = useState<any>(null);

  useEffect(() => {
    if (autoUpload || startUpload) {
      setLaunchUpload(true);
      setBrowse(false);
    }
  }, [autoUpload, startUpload]);

  useEffect(() => {
    if (Object.keys(selectedFiles).length > 0 && onSelect) {
      onSelect({
        identifier: id,
        files: selectedFiles,
      });
    }
    if (multiple === false) {
      if (autoUpload) {
        setLaunchUpload(true);
      }
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (launchUpload) {
      setLaunchUpload(false);
      if (Number(maxUploadLimit) > Object.keys(processQueue).length) {
        const fileId = getOnePendingFileIdFromFileQueue(fileQueue);
        if (fileId) {
          console.log("sending " + fileId + " to queue");
          console.log('queue size is ' + Number(Number(Object.keys(processQueue).length) + 1));
          setProcessQueue(prevQueue => {
            return [...prevQueue, fileId]
          });
        } else {
          if (Object.keys(processQueue).length <= 0) {
            setLaunchUpload(false);
            setBrowse(true);
            console.log("Uploading completed..");
            if (onAllUploadComplete) {
              onAllUploadComplete();
            }
          }
        }
      } else {
        console.log('Limit is(' + maxUploadLimit + '). Curnt QSize = (' + Object.keys(processQueue).length + ') Waiting for other files to complete.');
      }
    }
  }, [launchUpload]);

  useEffect(() => {
    for (let i = 0; i < processQueue.length; i++) {
      let fileId = processQueue[i];
      if (fileId && fileQueue[fileId]['status'] === STATUS.PENDING) {
        setFileQueue(prevQueue => ({
          ...prevQueue,
          [fileId]: {
            ...prevQueue[fileId],
            status: STATUS.PROGRESS,
          },
        }));
        console.log("uploading " + fileId + " starts");
        const cancelTokenSource = axios.CancelToken.source();
        setCancelTokens(prevTokens => ({
          ...prevTokens,
          [fileId]: cancelTokenSource,
        }));
        uploadFiles(selectedFiles[fileId]['file'], fileId, cancelTokenSource.token);
        console.log("Calling next file to queue");
        setLaunchUpload(true);
        break;
      }
    }
  }, [processQueue]);

  const uploadFiles = async (file: File, fileId: string, cancelToken: any) => {
    setBrowse(false);
    if(imageData === 'null') return;
    let S3fileKey = uploadPath + "/" + file.name
    S3fileKey = S3fileKey.replace(new RegExp('//', 'g'), '/');
    const fileData:any = await RNFS.readFile(imageData, 'base64');
    const b_File = Buffer.from(fileData, 'base64'); 

    try {
      const signedUrl = await axiosClient.get('/' + config.SIGNED_URL_GEN_API + '?key=' + S3fileKey);

      const response = await axios.put(signedUrl.data.data, b_File, {
        cancelToken,
        headers: {
          'Authorization': undefined,
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setFileQueue(prevQueue => ({
            ...prevQueue,
            [fileId]: {
              ...prevQueue[fileId],
              progress: progress,
              status: progress >= 100 ? STATUS.DONE : STATUS.PROGRESS,
            },
          }));

          if (onProgress) {
            onProgress({
              id,
              progress,
              file
            });
          }
        },
      });

      setFileQueue(prevQueue => ({
        ...prevQueue,
        [fileId]: {
          ...prevQueue[fileId],
          status: STATUS.DONE,
        },
      }));

      setProcessQueue(prevQueue => {
        const updatedQueue = prevQueue.filter(item => item !== fileId);
        return updatedQueue;
      });

      // console.log("Upload completed for " + fileId);
      // console.log('Checking unprocessed files');
      setLaunchUpload(true);
      if (onFileUploadComplete) {
        setValidationError('')
        onFileUploadComplete({
          status: STATUS.SUCCESS,
          message: 'Files uploaded successfully',
          data: { data: S3fileKey.split("/").pop(), uploadPath: S3fileKey },
          id
        });
      }
      setImageData(null);
    } catch (error: any) {

      setFileQueue(prevQueue => ({
        ...prevQueue,
        [fileId]: {
          ...prevQueue[fileId],
          status: STATUS.ERROR,
        },
      }));

      setProcessQueue(prevQueue => {
        const updatedQueue = prevQueue.filter(item => item !== fileId);
        return updatedQueue;
      });

      if (onFileUploadComplete) {
        setValidationError('Something went wrong')
        onFileUploadComplete({
          status: STATUS.ERROR,
          message: error.message || 'Something went wrong',
          data: null,
          id
        });
      }

      // console.log("Upload terminated for " + fileId);
      // console.log('Checking unprocessed files');
      setLaunchUpload(true);
      setImageData(null);
    }
  };

  const handleFileSelect = async () => {
    try {
      const _allowedTypes: any = allowedTypes === 'all' ? allowedTypes : getMimeTypesFromExtensions(allowedTypes)
      const files: any = multiple
        ? await DocumentPicker.pick({
          type: allowedTypes === 'all' ? [DocumentPicker.types.allFiles] : _allowedTypes,
        })
        : await DocumentPicker.pickSingle({
          type: allowedTypes === 'all' ? [DocumentPicker.types.allFiles] : _allowedTypes,
        });
      // Validate file type and size
      const validateFile = (file: DocumentPickerResponse) => {
        const fileTypeValid = allowedTypes === 'all' || (file.type ? _allowedTypes.includes(file.type) : true);
        const fileSizeValid = file.size! / (1024 * 1024) <= maxSizeInMB;

        if (!fileTypeValid) {
          setValidationError(`Invalid file type. Allowed types: ${_allowedTypes.join(', ')}`);
          showAlerts && dispatch(showToast(`Invalid file type. Allowed types: ${_allowedTypes.join(', ')}`,'error'))
          return false;
        }

        if (!fileSizeValid) {
          setValidationError(`File size exceeds the maximum limit of ${maxSizeInMB} MB`);
          showAlerts && dispatch(showToast(`File size exceeds the maximum limit of ${maxSizeInMB} MB`,'error'))
          return false;
        }
        return true;
      };

      const allFilesValid = Array.isArray(files) ? files.every(validateFile) : validateFile(files);

      if (!allFilesValid) {
        //setSelectedFiles(null);
        return;
      }

      if (files) {
        const _fileQueue: { [key: string]: { name: string; progress: number; id: string; status: string } } = {};
        const newSelectedFiles: { [key: string]: { id: string; file: File } } = {};
        console.log(files, 'files')
        Array.from(files).forEach((file: any) => {
          const fileId = generateId();
          const uniqueFilename = sanitizeFilename(fileId + "-" + file.name);  
         
          setImageData(file.uri);
          
          file = new File([file.uri], uniqueFilename, { type: file.type });
          
          _fileQueue[fileId] = { "name": file.name, "progress": 0, "id": fileId, "status": STATUS.PENDING };
          newSelectedFiles[fileId] = { id: fileId, file: file };
          console.log(newSelectedFiles, 'seleted')
        });

        if (multiple) {
          setFileQueue((prevQueue: any) => ({ ...prevQueue, ..._fileQueue }));
          setSelectedFiles((prevFiles: any) => ({ ...prevFiles, ...newSelectedFiles }));
        } else {
          setFileQueue(_fileQueue);
          setSelectedFiles(newSelectedFiles);
        }
        if ((autoUpload === true) || (autoUpload && multiple === true)) {
          setLaunchUpload(true);
        }
      }

      // setSelectedFiles(files);
      // onFileSelect(files);
      setValidationError(null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      {custom ? <TouchableOpacity
        style={{width: 'auto', height: 'auto'}}
        onPress={handleFileSelect}>{children}</TouchableOpacity> : <View style={styles.container}>
        <TouchableOpacity
          style={[styles.uploadButton, (errorText || validationError) ? styles.errorButton : null]}
          onPress={handleFileSelect}
        >
          <Text style={styles.buttonText}>
            {fileName}
          </Text>
        </TouchableOpacity>
        {label && <Text style={styles.label}>{label}</Text>}
        {(errorText || validationError) && <Text style={styles.errorText}>{errorText || validationError}</Text>}  </View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: COLORS.text.secondary,
    fontWeight: '600',
    position: 'absolute',
    top: -11,
    left: 8,
    padding: 2,
    backgroundColor: COLORS._background.main,
  },
  uploadButton: {
    height: 54,
    borderColor: COLORS.text.secondary,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    //backgroundColor: '#f0f0f0',
  },
  errorButton: {
    borderColor: 'red',
  },
  buttonText: {
    color: '#000'
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default CustomFileUpload;
