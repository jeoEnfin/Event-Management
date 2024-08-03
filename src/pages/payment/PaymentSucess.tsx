import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { QrCodeAPI } from '../profile/apis/QrCodeAPI'
import { format } from 'date-fns'
import Button from '../../components/common/Button'


type Props = {
  route: any
}

const PaymentSucess = ({ route }: Props) => {
  const { event, details } = route.params
  const navigation: any = useNavigation();
  const [data, setData] = useState<any>(null);
  const [qrCode, setQrcode] = useState(null);

  useEffect(() => {
    if (event) {
      setData(event);
    }
  }, [event])

  useEffect(() => {
    if (data && details) {
      getQrcode();
    }
  }, [data, details])

  const getQrcode = async () => {
    const _data = {
      epUserId: data.eoUserId,
      epExpoId: details.expId,
      attType: details.expType
    }
    try {
      const qrCode = await QrCodeAPI({ data: _data });
      setQrcode(qrCode.data)
    } catch (err: any) {
      console.log('QRCodeerror', err.response.data)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={require('../../assets/ci/sucessfull.png')} style={{ width: 60, height: 60 }} />
        <Text style={styles.headTxt}>Congratulation!</Text>
        <Text style={styles.subTxt}>Your registration was sucessful! You will receive an email shortly</Text>
        <View style={styles.qrContainer}>
          <Text style={styles.qrHeader}>Your QR Code</Text>
          <Text style={styles.qrMessage}>Scan the QR code to attented the event</Text>
          <View style={styles.qrBody}>
            {qrCode && <Image source={{ uri: qrCode }} style={{ width: '100%', height: '100%' }} />}
          </View>
        </View>
        {details.expName && <View style={styles.eventDetails}>
          <Text style={styles.text3}>Event Name:</Text>
          <Text style={styles.text2}>{details.expName}</Text>
        </View>}
        {details.expStartDate && details.expEndDate && <View style={styles.eventDetails}>
          <Text style={styles.text3}>Event Date:</Text>
          <Text style={styles.text2}>{format(details.expStartDate, 'dd MMMM yyyy')} - {format(details.expEndDate, 'dd MMMM yyyy')}</Text>
        </View>}
      </View>
      <View style={{width: '95%'}}>
        <Button label='Back to Home' buttonClick={()=>{navigation.goBack()}}/>
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
  qrHeader: {
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.text.main
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32
  },
  qrMessage: {
    fontWeight: '400',
    fontSize: 11,
    color: COLORS.text.main,
    marginTop: 2
  },
  qrBody: {
    width: 220,
    height: 220,
    marginVertical: 10
  },
  eventTxt: {
    fontWeight: '600',
    fontSize: 12,
    marginTop: 10
  },
  text3: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.main
  },
  eventDetails: {
    alignItems: 'center',
    gap: 5,
    marginVertical: 10
  },
  text2: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text.main,
    marginTop: 2
},
})