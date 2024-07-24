import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'


type Props = {
  route: any
}

const PaymentSucess = ({route}: Props) => {
  const { event } = route.params
  const navigation: any = useNavigation();

  useEffect(()=>{
    if(event){
    setTimeout(()=>{
      navigation.replace('EventDetails', { event });
    },5000)}
  },[event])

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={require('../../assets/ci/sucessfull.png')} style={{ width: 81, height: 81 }} />
        <Text style={styles.headTxt}>Congratulation!</Text>
        <Text style={styles.subTxt}>Your registration was sucessful! You will receive an email shortly</Text>
      </View>
    </ScreenWrapper>
  )
}

export default PaymentSucess

const styles = StyleSheet.create({
  headTxt: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 32,
    color: COLORS.text.main
  },
  subTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: COLORS.text.default,
    paddingHorizontal: 10,
    marginTop: 10
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20
  }
})