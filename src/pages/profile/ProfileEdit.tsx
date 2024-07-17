import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';
import InputText from '../../components/common/InputText';
import Button from '../../components/common/Button';

type Props = {}

const ProfileEdit = (props: Props) => {
  return (
    <ScreenWrapper>
      <View style={{ backgroundColor: COLORS._background.main, flex: 1, width: '100%', alignItems: 'center' }
      }>
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
        <View style={{padding: 10,gap: 10}}>
          <InputText
            placeholder='Name'
            autoComplete='name'
            textSecure={false}
            showText={() => { }}
            inputMode={'name'}
          // onDataChanged={handleEmailChange}
          // error={errorEmail}
          // errorTxt={emailErrorTxt}
          />
          <InputText
            placeholder='Email'
            autoComplete='email'
            textSecure={false}
            showText={() => { }}
            inputMode={'email'}
          // onDataChanged={handleEmailChange}
          // error={errorEmail}
          // errorTxt={emailErrorTxt}
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