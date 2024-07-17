import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { COLORS } from '../../constants';

interface CustomFileUploadProps {
  label?: string;
  placeholder?: string;
  onFileSelect: (file: DocumentPickerResponse | DocumentPickerResponse[]) => void;
  errorText?: string;
  allowedTypes?: string[] | 'all';
  maxSizeInMB?: number;
  multiple?: boolean;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  placeholder,
  onFileSelect,
  errorText,
  allowedTypes = 'all',
  maxSizeInMB = 5,
  multiple = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse | DocumentPickerResponse[] | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileSelect = async () => {
    try {
      const files = multiple 
        ? await DocumentPicker.pick({
            type: allowedTypes === 'all' ? [DocumentPicker.types.allFiles] : allowedTypes,
          })
        : await DocumentPicker.pickSingle({
            type: allowedTypes === 'all' ? [DocumentPicker.types.allFiles] : allowedTypes,
          });

      // Validate file type and size
      const validateFile = (file: DocumentPickerResponse) => {
        const fileTypeValid = allowedTypes === 'all' || (file.type ? allowedTypes.includes(file.type) : true);
        const fileSizeValid = file.size! / (1024 * 1024) <= maxSizeInMB;

        if (!fileTypeValid) {
          setValidationError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
          return false;
        }

        if (!fileSizeValid) {
          setValidationError(`File size exceeds the maximum limit of ${maxSizeInMB} MB`);
          return false;
        }

        return true;
      };

      const allFilesValid = Array.isArray(files) ? files.every(validateFile) : validateFile(files);

      if (!allFilesValid) {
        setSelectedFiles(null);
        return;
      }

      setSelectedFiles(files);
      onFileSelect(files);
      setValidationError(null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const renderSelectedFiles = () => {
    if (!selectedFiles) {
      return placeholder || 'Select a file';
    }

    if (Array.isArray(selectedFiles)) {
      return selectedFiles.map((file) => file.name).join(', ');
    }

    return selectedFiles.name;
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity
        style={[styles.uploadButton, (errorText || validationError) && styles.errorButton]}
        onPress={handleFileSelect}
      >
        <Text style={styles.buttonText}>
          {renderSelectedFiles()}
        </Text>
      </TouchableOpacity>
      {label && <Text style={styles.label}>{label}</Text>}
      {(errorText || validationError) && <Text style={styles.errorText}>{errorText || validationError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: COLORS.text.main,
    fontWeight: '400',
    position: 'absolute',
    top: -11,
    left: 8,
    padding: 2,
    backgroundColor: '#ffffff'
},
  uploadButton: {
    height: 50,
    borderColor: COLORS.text.secondary,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  errorButton: {
    borderColor: 'red',
  },
  buttonText: {
    color: '#000',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default CustomFileUpload;
