import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { COLORS } from '../../constants'
import TopBar from '../../components/TopBar'

type Props = {}

const PaymentFail = (props: Props) => {
  return (
    <ScreenWrapper>
      <TopBar back />
      <View style={styles.container}>
        <View style ={styles.body}>
          <Image source={require('../../assets/ci/fail.png')} style={{width: 81, height: 80}}/>
          <Text style={styles.headTxt}>Payment Failed</Text>
          <Text style={styles.subTxt}>Your registration was failed! please try again</Text>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default PaymentFail

const styles = StyleSheet.create({
  headTxt: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 32,
    color: COLORS.text.main,
    marginTop: 10
  },
  subTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: COLORS.text.default,
    paddingHorizontal: 68,
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  body: {
    alignItems: 'center'
  }
})