import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import InputText from '../../components/common/InputText'
import { isValidEmail } from '../../utils/validations'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'
import { useNavigation } from '@react-navigation/native'
import { ForgotPasswordAPI } from './apis/ForgotPasswordApi'

type Props = {}

const ForgotPassword = (props: Props) => {
    const navigation: any = useNavigation()
    const [username, setUsername] = useState<string>('');
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const platformName = Platform.OS;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const textInputRef: any = useRef(null);

    const clearTextFields = () => {
        if (textInputRef.current) {
            textInputRef.current.clear();
        }
    };


    const handleEmailChange = (newEmail: string) => {
        const isEmailValid = isValidEmail(newEmail);
        if (isEmailValid) {
            setUsername(newEmail.toLowerCase())
            setErrorEmail(false)
            setError(false)
            setEmailErrorMessage('')
        } else {
            setEmailErrorMessage('Enter valid email address')
            setErrorEmail(true);
            setError(true);
        }
    };

    const validation = () => {
        if (username.length === 0) {
            setErrorEmail(true);
            setError(true);
            setEmailErrorMessage('Email must be enter')
        }
        else if (username.length === 0) {
            setError(true);
            setEmailErrorMessage('Email must be enter')
        }
        else if (errorEmail === true) {
            setError(true)
            setEmailErrorMessage('Email must be enter')
        }
        else {
            setError(false)
        }
    }

    const handleSubmit = async () => {
        validation();
        if (username) {
            setIsLoading(true)
            const data = {
                email: username
            }
            try {
                const forgotPasswordResponse = await ForgotPasswordAPI({ data })
                console.log(forgotPasswordResponse.data.data)
                if (forgotPasswordResponse.data.data) {
                    Alert.alert(forgotPasswordResponse.data.data, `Email send successfully to your email address ${data.email}`, [
                        { text: 'OK', onPress: () => { } },
                    ]);
                    // setTimeout(() => {
                    //     navigation.navigate('Login')
                    // }, 3000)
                }
                setIsLoading(false);
                clearTextFields();
            } catch (e: any) {
                setError(true)
                setIsLoading(false);
                clearTextFields();
                if (e.response.data.message) {
                    Alert.alert('Email send successfully', `Email send successfully to your email address ${data.email}`, [
                        { text: 'OK', onPress: () => { } },
                    ]);
                }
                else {
                    setErrorMessage('Something went wrong')
                }
            }
        }
    }

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}>
                <View>
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
                            errorTxt={emailErrorMessage}
                        />
                        {error && <Text style={styles.errorTxt}>{errorMessage}</Text>}
                    </View>
                    <View style={styles.infoTxtBody}>
                        <Text style={styles.infoTxt}>A link send to your mail to reset password.</Text>
                    </View>
                </View>
                <View>
                    <Button
                        buttonClick={handleSubmit}
                        label='Reset'
                        loading={isLoading}
                    />
                    <View style={styles.infoTxtBody}>
                        <Text style={styles.infoTxt}>Remember it ? <Text
                            style={{ color: COLORS.secondary.main, fontWeight: '600' }}
                            onPress={() => { navigation.navigate('Login') }}

                        >Login</Text></Text>
                    </View>
                </View>
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