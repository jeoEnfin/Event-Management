import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'
import TopBar from '../components/TopBar'
import ScreenWrapper from '../components/ScreenWrapper'
import DeviceInfo from 'react-native-device-info';
import FloatingButton from '../components/FloatingButton'
import Banner from '../components/common/Banner'

type Props = {

}

const JoinScreen = (props: Props) => {
  const navigation: any = useNavigation()
  const [errorMessage, setErrorMessage] = useState(false)
  

  const getInfo = () => {
    console.log('info',DeviceInfo.getModel())
    console.log('info',DeviceInfo.getBrand())
  }


  return (
    <ScreenWrapper>
      <TopBar title='Join ' scanner/>
      <Banner event_url='https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg' />
      <FloatingButton />
    </ScreenWrapper>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background
  },
  btn: {
    width: 150,
    height: 40,
    backgroundColor: COLORS.btnBackground2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 5
  },
  btnText: {
    color: COLORS.baseWhite
  }
})