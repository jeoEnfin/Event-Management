import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import RoundButton from '../../components/RoundButton'
import OTPInput from '../../components/OTPInput'
import { useDispatch } from 'react-redux'
import { Otp } from '../../store/actions'

type Props = {
    route: any;
}

const TwoFactorAuth = ({route}: Props) => {
    const navigation: any = useNavigation()
    const [otp,setOtp] = useState('')
   
    const dispatch = useDispatch();

    const handleOTP = ()=>{
        if(otp !== null ){
         dispatch(Otp(otp))
        }
        else {
            console.log('opt error')
        }
    }

    return (
        <View style={styles.container}>
            <View>
            <View>
                <RoundButton
                    iconName='arrow-back'
                    iconSize={30}
                    color={COLORS.background2}
                    backgroundColor={COLORS.baseWhite}
                    hapticFeedback={true}
                    onPress={() => {navigation.goBack()}}
                />
            </View>
            <View style={styles.headBody}>
                <Text style={styles.headTxt}>Enter Verification Code</Text>
                <Text style={styles.headTxt2}>Enter the 6-digit code that we've sent to </Text>
            </View>
            <View style={styles.otpBody}>
                <OTPInput length={6} onComplete={(data)=>{setOtp(data)}} />
            </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleOTP}>
                <Text style={styles.btnTxt}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TwoFactorAuth

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1,
        justifyContent: 'space-between'
    },
    btn: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: COLORS.baseWhite,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    btnTxt: {
        color: COLORS.background2,
        fontSize: 20,
        fontWeight: 'bold'
    },
    headTxt: {
        color: COLORS.baseWhite,
        fontSize: 25,
        fontWeight: 'bold'
    },
    headBody: {
        margin: 10,
        padding: 10
    },
    headTxt2: {
        color: COLORS.lightWhite,
        fontSize: 14,
        fontWeight: '500'
    },
    otpBody: {
        margin: 10,
        padding: 10
    }
})