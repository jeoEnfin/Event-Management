import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';
import InputText from '../../components/common/InputText';
import Button from '../../components/common/Button';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { splitName } from '../../utils/common';
import { UpdateProfileAPI } from './apis/UpdateProfileAPI';
import { useNavigation } from '@react-navigation/native';
import { config } from '../../utils/config';
import CustomFileUpload from '../../components/common/CustomFileUpload';
import * as Yup from 'yup';
import { Formik } from 'formik';
import OverlayLoader from '../../components/modals/OverlayLoader';
import ActivityElement from '../../components/common/ActivityElement';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toast/ToastActions';
import { toggle } from '../../store/slice/stateSlice';

type Props = {}

const ProfileEdit = (props: Props) => {
  const navigation: any = useNavigation();
  const [userData, setUserData] = useState({
    uuid: '',
    name: '',
    email: '',
    userImage: '',
    roleId: null,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState({
    uuid: '',
    name: '',
    email: '',
    roleId: null,
    userImage: ''
  })
  const dispatch: any = useDispatch();
  const [image, setImage] = useState<string>(data.userImage || '');
  const [userImagePreview, setUserImagePriview] = useState<any>(null);
  const formikRef = useRef<any>(null);
  const [onProgress, setOnProgress] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      )
      .trim('No leading or trailing spaces allowed')
      .required('Email is required'),
    name: Yup.string()
      .trim('No leading or trailing spaces allowed')
      .matches(/^\S+(?: \S+)*$/, 'No leading, trailing, or consecutive spaces allowed')
      .min(1, 'Name must be at least 1 characters')
      .required('Name is required')
  });

  useEffect(() => {
    getData();
  }, [])

  const initialValues = {
    name: '',
    email: '',
  };

  useEffect(() => {
    if (userData) {
      if (formikRef.current) {
        formikRef.current.setFieldValue('name', userData.name);
        formikRef.current.setFieldValue('email', userData.email);
      }
    }
  }, [userData])

  const getData = async () => {
    setIsLoading(true)
    try {
      const _userData = await AsyncStorageUtil.getData('userData');
      const _roleId = await AsyncStorageUtil.getData('userRoleId');
      if (_userData) {
        const _data = {
          name: _userData?.data?.displayName,
          email: _userData?.data?.email,
          uuid: _userData?.uuid,
          userImage: _userData?.data?.userImage,
          roleId: _roleId,
        }
        setUserData(_data)
        setData({
          uuid: _userData?.uuid,
          name: _userData?.data?.displayName,
          email: _userData?.data?.email,
          roleId: _roleId,
          userImage: _userData?.data?.userImage
        })
        setImage(_userData?.data?.userImage)
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleSuccess = () => {
    setTimeout(() => {
      navigation.navigate('Profile')
    }, 1000)
  };

  const handleUpdate = async (data: any) => {
    setIsLoading(true);
    const { firstName, lastName } = splitName(data?.name)
    const _data = {
      firstName: firstName,
      lastName: lastName,
      email: data?.email.toLowerCase(),
      roleIds: [userData.roleId],
      userImage: userImagePreview || userData?.userImage
    }
    try {
      const updateData: any = await UpdateProfileAPI({ data: _data, userId: userData.uuid });
      if (updateData) {
        setIsLoading(false);
        const exisitingData = await AsyncStorageUtil.getData('userData');
        const _updatedData = {
          ...exisitingData,
          data: {
            ...exisitingData.data,
            displayName: data.name,
            email: _data.email,
            userImage: _data.userImage,
          },
        };
        await AsyncStorageUtil.saveData('userData', _updatedData);
        dispatch(showToast('User details updated successfully', 'success'))
        dispatch(toggle());
        handleSuccess();
      }
    } catch (err: any) {
      console.log(err.response, 'error');
      dispatch(showToast('Something went wrong , Please try again later', 'error'));
      setIsLoading(false);
    }
  }

  const handleUploadComplete = async (result: {
    status: string;
    message: string;
    data: any;
    id: string;
  }) => {
    const _result = await result;
    if (_result) {
      if (_result.status === 'success') {
        setUserImagePriview(_result?.data?.data);
        setImage(_result?.data?.data);
      } else if (_result.status == 'error') {
        dispatch(showToast('Something went wrong , Please try again later', 'error'));
      }
    }
  }

  const handleProgress = ({ id, progress, file }: any) => {
    if (progress === 100) {
      setOnProgress(false);
    }
  };

  const onImageSelected = () => {
    setOnProgress(true);
  }


  if (isLoading && !userData) {
    return <ActivityElement />
  }

  return (
    <ScreenWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        innerRef={formikRef}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        {({ handleSubmit, setFieldTouched, setFieldValue, values, errors, touched }) => (

          <View style={{ backgroundColor: COLORS._background.main, flex: 1, width: '100%', justifyContent: 'space-between' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.avatar_container}>
                <View style={styles.avatar}>

                  {image ? <Image
                    source={{
                      uri: image === 'default.jpg'
                        ? `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/expo/default.jpg`
                        : (image && (image.startsWith('https') || image.startsWith('http')))
                          ? image
                          : `${config.CLOUD_FRONT_URL}/${config.USER_PATH}${image}`
                    }}
                    style={{ width: '100%', height: '100%', borderRadius: 70 }}
                    resizeMode='cover'
                  /> : <Image resizeMode='cover' source={require('../../assets/profileIcons/img_avatar1.png')}
                    style={{ width: '100%', height: '100%', borderRadius: 70 }}
                  />
                  }
                  <CustomFileUpload
                    id={'userImage'}
                    fileName={'userImage'}
                    maxSizeInMB={5}
                    allowedTypes={['.jpg', '.png', '.webp']}
                    multiple={true}
                    onFileUploadComplete={handleUploadComplete}
                    uploadPath={config.USER_PATH}
                    custom={true}
                    onProgress={handleProgress}
                    onSelect={onImageSelected}
                  >
                    <View style={styles.editIcon}>
                      <Icon name={'create'} size={26} color={COLORS.secondary.main} />
                    </View>
                  </CustomFileUpload>
                  {onProgress && <ActivityIndicator style={styles.imageLoader} color={COLORS.secondary.main} size={'large'} />}
                </View>
              </View>
              <View style={{ padding: 10, gap: 20, marginTop: 30 }}>
                <InputText
                  label='Name'
                  placeholder='Name'
                  autoComplete='name'
                  textSecure={false}
                  showText={() => { }}
                  inputMode={'text'}
                  onDataChanged={(value) => setFieldValue('name', value)}
                  error={!!(errors.name && touched.name)}
                  errorTxt={(touched.name && touched.name) ? errors.name : ''}
                  value={values.name}
                  onFocus={() => setFieldTouched('name', true)}
                  onBlur={() => setFieldTouched('name', true)}
                  backgroundColor={COLORS._background.main}
                />
                <InputText
                  label='Email'
                  placeholder='Email'
                  autoComplete='email'
                  textSecure={false}
                  showText={() => { }}
                  inputMode={'email'}
                  onDataChanged={(value) => setFieldValue('email', value)}
                  error={!!(errors.email && touched.email)}
                  errorTxt={(touched.email && touched.email) ? errors.email : ''}
                  value={values.email}
                  onFocus={() => setFieldTouched('email', true)}
                  onBlur={() => setFieldTouched('email', true)}
                  backgroundColor={COLORS._background.main}
                />
              </View>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 10, marginBottom: 20 }}>
              <Button
                label='Save'
                loading={isLoading || onProgress}
                buttonClick={handleSubmit}
              />
            </View>
          </View>)}</Formik>
      <OverlayLoader visible={isLoading} />
    </ScreenWrapper>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({
  avatar: {
    height: 140,
    width: 140
  },
  avatar_container: {
    marginTop: 20
  },
  editIcon: {
    position: 'absolute',
    right: -5,
    bottom: -2,
    margin: 7,
    backgroundColor: COLORS._background.primary,
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 70
  }
})