import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import RoundButton from '../../components/RoundButton'
import OTPInput from '../../components/OTPInput'
import { useDispatch } from 'react-redux'
import { Logout, Otp } from '../../store/actions'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import Button from '../../components/common/Button'

type Props = {
    route: any;
}

const TwoFactorAuth = ({ route }: Props) => {
    const navigation: any = useNavigation()
    const [otp, setOtp] = useState('')

    const dispatch = useDispatch();

    const handleOTP = () => {
        if (otp !== null) {
            dispatch(Otp(otp))
        }
        else {
            console.log('opt error')
        }
    }

    return (
        <AuthContainer>
            <AuthHeader
                title='OTP Authentication'
                subTitle='OTP set to sample@example.com.'
                linkButtonLabel='Change'
                isLinkButton
                linkButtonClick={()=>{ dispatch(Logout())}}
            />
            <View style={styles.otpBody}>
                <OTPInput length={6} onComplete={(data) => { setOtp(data) }} />
            </View>
            <View style={styles.infoTxtBody}>
                <Text style={styles.infoTxt}>Resend OTP in 60 sec</Text>
            </View>
            <Button
                label='Submit'
                buttonClick={handleOTP}
            />
        </AuthContainer>
    )
}

export default TwoFactorAuth

const styles = StyleSheet.create({
    otpBody: {
        marginVertical: 20
    },
    infoTxtBody: {
        alignItems: 'center',
        marginVertical: 25
    },
    infoTxt: {
        color: COLORS.text.main
    }
})