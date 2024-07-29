import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';
import InputText from '../../components/common/InputText';
import Button from '../../components/common/Button';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { isValidEmail } from '../../utils/validations';
import { splitName } from '../../utils/common';
import { UpdateProfileAPI } from './apis/UpdateProfileAPI';
import { useNavigation } from '@react-navigation/native';
import { CacheIndex } from '../../utils/services/CacheIndex';

type Props = {}

const ProfileEdit = (props: Props) => {
  const navigation: any = useNavigation();
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState({
    uuid: '',
    name: '',
    email: '',
    roleId: null
  })
  const [error, setError] = useState<boolean>(false);
  const [errorTxt, setErrorTxt] = useState<string>('')
  const [emailErrorTxt, setEmailErrorTxt] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(data.email || '');
  const [nameErrorTxt, setNameErrorTxt] = useState<string>('')
  const [errorName, setErrorName] = useState<boolean>(false);
  const [name, setName] = useState<string>(data.name || '');

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setIsLoading(true)
    try {
      const _userData = await AsyncStorageUtil.getData('userData')
      if (_userData) {
        const _data = {
          name: _userData?.data?.displayName,
          email: _userData?.data?.email,
          uuid: _userData?.uuid
        }
        setUserData(_data)
        setData({
          uuid: _userData?.uuid,
          name: _userData?.data?.displayName,
          email: _userData?.data?.email,
          roleId: _userData?.roleId
        })
        setName(_userData?.data?.displayName)
        setEmail(_userData?.data?.email)
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (newEmail: string) => {
    const isEmailValid = isValidEmail(newEmail);
    if (isEmailValid) {
      setEmail(newEmail.toLowerCase())
      setErrorEmail(false)
      setError(false)
      setEmailErrorTxt('')
    } else {
      setEmailErrorTxt('Enter a valid email address')
      setErrorEmail(true);
      setError(true);
    }
  };

  const handleNameChange = (newName: string) => {
    const isNameValid = newName.length > 0;
    if (isNameValid) {
      setName(newName)
      setErrorName(false)
      setError(false)
      setNameErrorTxt('')
    } else {
      setNameErrorTxt('Enter a valid email address')
      setErrorName(true);
      setError(true);
    }
  };

  const validation = () => {
    if (name.length === 0 || email.length === 0) {
      setErrorEmail(true);
      setErrorName(true)
      setError(true);
    }
    else if (name.length === 0) {
      setErrorName(true)
      setError(true);
    }
    else if (email.length === 0) {
      setErrorEmail(true)
      setError(true);
    }
    else if (errorEmail === true && errorName === true) {
      setError(true)
    }
    else {
      setError(false)
    }
  }

  const handleSuccess = () => {
    setTimeout(() => {
      navigation.navigate('Profile')
    }, 1000)
  };

  const handleUpdate = async () => {
    validation();
    if (name != '' && email != '') {
      setIsLoading(true);
      if (name === data.name && email === data.email) {
        setIsLoading(false);
        return Alert.alert('No changes', 'save after change any data', [
          { text: 'OK', onPress: () => { } },
        ]);
      }
      const { firstName, lastName } = splitName(name)
      const _data = {
        _id: data.uuid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleIds: [data.roleId]
      }
      try {
        const updateData: any = await UpdateProfileAPI({ data: _data });
        if (updateData) {
          setIsLoading(false);
          const exisitingData = await AsyncStorageUtil.getData('user_details');
          const _updatedData = {
            ...exisitingData,
            data: {
              ...exisitingData.data,
              displayName:name,
              email,
            },
          };
          await AsyncStorageUtil.saveData('user_details', _updatedData);
          Alert.alert('Profile Updated', 'Your profile updated succesfully!', [
            { text: 'OK' },
          ]);
          handleSuccess();
        }
      } catch (err: any) {
        console.log(err.response.data, 'error');
        setErrorTxt('Something went wrong')
        setIsLoading(false);
      }
    } else {
      Alert.alert('Invalid Credentials', 'name or email is invalid', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setError(true)
    }
  }

  return (
    <ScreenWrapper>
      <View style={{ backgroundColor: COLORS._background.main, flex: 1, width: '100%', justifyContent: 'space-between' }
      }>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.avatar_container}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg' }}
                style={{ width: '100%', height: '100%', borderRadius: 70 }}
                resizeMode='cover'
              />
              <TouchableOpacity style={styles.editIcon}>
                <Icon name={'create'} size={26} color={COLORS.secondary.main} />
              </TouchableOpacity>
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
              defaultValue={data.name || ''}
              onDataChanged={handleNameChange}
              error={errorName}
              errorTxt={nameErrorTxt}
              backgroundColor={COLORS._background.main}
            />
            <InputText
              label='Email'
              placeholder='Email'
              autoComplete='email'
              textSecure={false}
              showText={() => { }}
              inputMode={'email'}
              defaultValue={data.email || ''}
              onDataChanged={handleEmailChange}
              error={errorEmail}
              errorTxt={emailErrorTxt}
              backgroundColor={COLORS._background.main}
            />
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 10, marginBottom: 20 }}>
          <Button
            label='Save'
            loading={isLoading}
            buttonClick={handleUpdate}
          />
        </View>
      </View>
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
    right: 0,
    bottom: 0,
    margin: 7,
    backgroundColor: COLORS._background.primary,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})