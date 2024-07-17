import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import RoundButton from '../../components/RoundButton'
import OTPInput from '../../components/OTPInput'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, Otp } from '../../store/actions'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import Button from '../../components/common/Button'
import { CiTruncate } from '../../utils/common'

type Props = {
    route: any;
}

const TwoFactorAuth = ({ route }: Props) => {
    const navigation: any = useNavigation()
    const user = useSelector((state: any) => state.AuthReducers.authUsername)
    const token = useSelector((state: any) => state.AuthReducers.authToken)
    const [otp, setOtp] = useState('')
    const [errorTxt, setErrorTxt] = useState<string>('')

    const dispatch = useDispatch();

    const handleOTP = () => {
        if (otp !== '') {
            dispatch(Otp(otp))
            setErrorTxt('')
        }
        else {
            setErrorTxt('Token must be enter')
        }
    }

    return (
        <AuthContainer>
            <View>
                <View>
                    <AuthHeader
                        title='OTP Authentication'
                        subTitle={`OTP set to ${CiTruncate(user, 15)}`}
                        linkButtonLabel='Change'
                        isLinkButton
                        linkButtonClick={() => { dispatch(Logout()) }}
                    />
                    <View style={styles.otpBody}>
                        <OTPInput length={6} onComplete={(data) => setOtp(data)} />
                        {errorTxt && <Text style={styles.errorTxt}>{errorTxt}</Text>}
                    </View>
                    <View style={styles.infoTxtBody}>
                        <Text style={styles.infoTxt}>Resend OTP in 60 sec</Text>
                    </View>
                </View>
                <View>
                    <Button
                        label='Submit'
                        buttonClick={handleOTP}
                    />
                </View>
            </View>
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
    },
    errorTxt: {
        color: COLORS.redButton,
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 10,
    }
})