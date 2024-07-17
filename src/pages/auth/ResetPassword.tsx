import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import InputText from '../../components/common/InputText'
import { useNavigation } from '@react-navigation/native'
import { isValidPassword } from '../../utils/validations'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'

type Props = {}

const ResetPassword = (props: Props) => {
    const navigation: any = useNavigation()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<boolean>(false);
    const platformName = Platform.OS;

    const handlePasswordChange = (newPassword: string) => {
        const isPasswordValid = isValidPassword(newPassword);
        if (isPasswordValid) {
            setPassword(newPassword);
            setErrorPassword(false)
            setError(false)
        }
        else {
            setErrorPassword(true);
            setError(true)
        }
    };

    const handleConformPasswordChange = (newPassword: string) => {
        const isConfirmPasword = password === newPassword;
        if (isConfirmPasword) {
            setConfirmPassword(newPassword);
            setErrorConfirmPassword(false)
            setError(false)
        }
        else {
            setErrorConfirmPassword(true);
            setError(true)
        }
    };

    const validation = () => {
        if (password.length === 0 || confirmPassword.length === 0) {
            setErrorPassword(true);
            setErrorConfirmPassword(true)
            setError(true);
        }
        else if (password.length === 0) {
            setError(true);
        }
        else if (errorPassword === true) {
            setError(true)
        }
        else if (errorConfirmPassword === true) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const handleSubmit = () => {
        validation();
        if (!error) {
            navigation.navigate('Login')
        }
    }

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}>
                <View>
                    <AuthHeader
                        title='Reset Password?'
                        subTitle='Create a new password for your account'
                    />
                    <View style={{ marginVertical: 25, gap: 7 }}>
                        <InputText
                            placeholder='New Password'
                            iconName='eye-outline'
                            autoComplete='new-password'
                            textSecure={isTextSecure}
                            showText={() => { setIsTextSecure(!isTextSecure) }}
                            hideText={() => { setIsTextSecure(!isTextSecure) }}
                            onDataChanged={handlePasswordChange}
                            keyboardType={'default'}
                            //value={password}
                            error={errorPassword}
                        />
                        <InputText
                            placeholder='Confirm Password'
                            // iconName='eye-outline'
                            autoComplete='new-password'
                            textSecure={true}
                            showText={() => { }}
                            // hideText={() => { setIsTextSecure(!isTextSecure) }}
                            onDataChanged={handleConformPasswordChange}
                            keyboardType={'default'}
                            //value={password}
                            error={errorConfirmPassword}
                        />
                        {error && <Text style={styles.errorTxt}>Enter valid details</Text>}
                    </View>
                </View>
                <View>
                    <Button
                        label='Reset'
                        buttonClick={handleSubmit}
                    />
                    <View style={styles.infoTxtBody}>
                        <Text style={styles.infoTxt}>Remember it ? <Text
                            style={{ color: COLORS.secondary.main, fontWeight: '600' }}
                            onPress={() => { navigation.navigate('Login') }}>Login</Text></Text>
                    </View>
                </View>
            </View>
        </AuthContainer>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    errorTxt: {
        color: COLORS.redButton,
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500'
    },
    infoTxtBody: {
        alignItems: 'center',
        marginVertical: 25
    },
    infoTxt: {
        color: COLORS.text.main
    },
})