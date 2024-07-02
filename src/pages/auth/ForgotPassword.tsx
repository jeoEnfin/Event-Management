import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import InputText from '../../components/common/InputText'
import { isValidEmail } from '../../utils/validations'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const ForgotPassword = (props: Props) => {
    const navigation: any = useNavigation()
    const [username, setUsername] = useState('');
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const platformName = Platform.OS;


    const handleEmailChange = (newEmail: string) => {
        const isEmailValid = isValidEmail(newEmail);
        if (isEmailValid) {
            setUsername(newEmail.toLowerCase())
            setErrorEmail(false)
            setError(false)
        } else {
            setErrorEmail(true);
            setError(true);
        }
    };

    const validation = () => {
        if (username.length === 0) {
            setErrorEmail(true);
            setError(true);
        }
        else if (username.length === 0) {
            setError(true);
        }
        else if (errorEmail === true) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const handleSubmit = () => {
        validation();
        navigation.navigate('ResetPassword')
    }

    return (
        <AuthContainer>
            <AuthHeader
                title='Forgot Password?'
                subTitle='Fill the form to reset your password'
            />
            <View style={{ marginTop: 15, gap: 6 }}>
                <InputText
                    placeholder='Email'
                    autoComplete='email'
                    textSecure={false}
                    showText={() => { }}
                    inputMode={'email'}
                    onDataChanged={handleEmailChange}
                    //value={email}
                    error={errorEmail}
                />
                {error && <Text style={styles.errorTxt}>Enter valid details</Text>}
            </View>
            <View style={styles.infoTxtBody}>
                <Text style={styles.infoTxt}>A link send to you mail to reset password.</Text>
            </View>
            <Button
                buttonClick={handleSubmit}
                label='Reset'
            />
            <View style={styles.infoTxtBody}>
                <Text style={styles.infoTxt}>Remember it ? <Text 
                style={{color: COLORS.secondary.main , fontWeight: '600'}}
                onPress={()=>{navigation.navigate('Login')}}
                
                >Login</Text></Text>
            </View>
        </AuthContainer>
    )
}

export default ForgotPassword

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