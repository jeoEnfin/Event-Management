import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import RoundButton from '../../components/RoundButton';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail, isValidPassword } from '../../utils/validations';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import googleConfig from '../../utils/services/GoogleSigninConfig';
import { useDispatch } from 'react-redux';
import { Login, Role } from '../../store/actions';
import Button from '../../components/common/Button';
import CheckboxWithLabel from '../../components/common/CheckboxWithLabel';
import InputText from '../../components/common/InputText';
import AuthContainer from './common/AuthContainer';
import AuthHeader from './common/AuthHeader';
import CustomIconButton from '../../components/common/CustomIconButton';
import { AuthLoginAPI } from './apis/AuthLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { CacheIndex } from '../../utils/services/CacheIndex';




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const LoginScreen = (props: Props) => {
    const navigation: any = useNavigation()
    const dispatch: any = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const platformName = Platform.OS;
    const [errorTxt, setErrorTxt] = useState<string>('')
    const [emailErrorTxt, setEmailErrorTxt] = useState<string>('')
    const [passwordErrorTxt, setPasswordErrorTxt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rememberCheck, setRememberCheck] = useState<boolean>(false);



    useEffect(() => {
        googleConfig();
    }, []);

    const handleEmailChange = (newEmail: string) => {
        setErrorTxt('')
        const isEmailValid = isValidEmail(newEmail);
        if (isEmailValid) {
            setUsername(newEmail.toLowerCase())
            setErrorEmail(false)
            setError(false)
            setEmailErrorTxt('')
        } else {
            setEmailErrorTxt('Enter a valid email address')
            setErrorEmail(true);
            setError(true);
        }
    };

    const handlePasswordChange = (newPassword: string) => {
        setErrorTxt('')
        const isPasswordValid = newPassword.length > 0;
        if (isPasswordValid) {
            setPassword(newPassword);
            setErrorPassword(false)
            setError(false)
            setPasswordErrorTxt('')
        }
        else {
            setPasswordErrorTxt('Password must be enter')
            setErrorPassword(true);
            setError(true)
        }
    };

    const validation = () => {
        if (username.length === 0 || password.length === 0) {
            setErrorEmail(true);
            setErrorPassword(true)
            setError(true);
        }
        else if (username.length === 0) {
            setErrorEmail(true)
            setError(true);
        }
        else if (password.length === 0) {
            setErrorPassword(true)
            setError(true);
        }
        else if (errorEmail === true && errorPassword === true) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const handleLogin = async () => {
        validation();

        if (username != '' && password != '') {
            setIsLoading(true);
            const data = {
                email: username,
                password: password
            }
            try {
                const userData = await AuthLoginAPI({ data });
                const access_token = userData?.data?.data?.access_token;
                const tenant = userData?.data?.data?.tenant;
                const _user = userData?.data?.data?.user;
                if (access_token) {
                    await AsyncStorageUtil.saveData('token', access_token);
                }
                if (tenant) {
                    await AsyncStorageUtil.saveData('tenant_id', tenant)
                }
                if (rememberCheck) {
                    await AsyncStorageUtil.saveData('user_credentials', data)
                }
                if (_user) {
                    await AsyncStorageUtil.saveData('userData', _user)
                    if (_user?.roleId) {
                        //await AsyncStorageUtil.saveData('userRoleId', _user?.roleId)
                        //console.log('roleId', _user?.roleId)
                        dispatch(Role(_user?.roleId));
                    }
                    else if (_user?.roles.length > 0) {
                        await AsyncStorageUtil.saveData('userRoles', _user?.roles);
                        //console.log('roles', _user?.roles);
                    }
                }
                dispatch(Login(username, access_token, tenant))
                setError(false)
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                if (error?.response?.data?.message) {
                    setError(true)
                    setErrorTxt(error?.response?.data?.message)
                } else {
                    Alert.alert('Some thing went wrong', '', [
                        { text: 'OK', onPress: () => { } },
                    ]);
                }
            }
        } else {
            // Alert.alert('Invalid Credentials', 'username or password is invalid', [
            //     { text: 'OK', onPress: () => console.log('OK Pressed') },
            // ]);
            setError(true)
        }
    }

    const googleLoginHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.idToken)
        } catch (error: any) {
            console.log(error);
        }
    }

    const showPassword = () => {
        setIsTextSecure(!isTextSecure)
    }

    const ForgotPasswordRoute = () => {
        navigation.navigate('ForgotPassword');
    }

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}>
                <View>
                    <AuthHeader
                        title='Welcome Back'
                        subTitle='Login to your Account'
                    />
                    <ScrollView>
                        <View style={{ marginTop: 10, gap: 10 }}>
                            <InputText
                                placeholder='Email'
                                autoComplete='email'
                                textSecure={false}
                                showText={() => { }}
                                inputMode={'email'}
                                onDataChanged={handleEmailChange}
                                error={errorEmail}
                                errorTxt={emailErrorTxt}
                            />
                            <InputText
                                placeholder='Password'
                                iconName='eye-outline'
                                autoComplete='new-password'
                                textSecure={isTextSecure}
                                showText={showPassword}
                                // hideText={hidePassword}
                                onDataChanged={handlePasswordChange}
                                keyboardType={'default'}
                                error={errorPassword}
                                errorTxt={passwordErrorTxt}
                            />
                            {(error && errorTxt) && <Text style={styles.errorTxt}>{errorTxt}</Text>}
                        </View>
                        <View style={styles.forgotBody}>
                            <CheckboxWithLabel
                                label='Remember me'
                                isChecked={rememberCheck}
                                onPress={() => { setRememberCheck(!rememberCheck) }}
                            />
                            <TouchableOpacity onPress={() => { ForgotPasswordRoute() }}>
                                <Text style={styles.fgtTxt}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <Button label='Login' buttonClick={handleLogin} loading={isLoading} />
                    <View style={styles.signupBody}>
                        <Text style={styles.signupTxt}>or continue with</Text>
                    </View>
                    <View style={styles.socialBtn}>
                        <CustomIconButton
                            imageUrl='https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png'
                            onClick={() => googleLoginHandler()}
                        />
                        <CustomIconButton
                            imageUrl='https://i.pinimg.com/736x/42/75/49/427549f6f22470ff93ca714479d180c2.jpg'
                        // onClick={() => googleLoginHandler()}
                        />
                        <CustomIconButton
                            imageUrl='https://i.pinimg.com/736x/ca/61/15/ca6115500b30a04913546177d69126f3.jpg'
                        // onClick={() => googleLoginHandler()}
                        />
                    </View>
                </View>
            </View>
        </AuthContainer>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    txtField: {
        borderColor: '#8213d6',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        color: COLORS.background2
    },
    forgotBody: {
        alignItems: 'center',
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    fgtTxt: {
        color: COLORS.secondary.main,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        gap: 15
    },
    signupBody: {
        alignItems: 'center',
        marginVertical: 20
    },
    signupTxt: {
        color: COLORS.text.main
    },
    errorTxt: {
        color: COLORS.redButton,
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500',
    }
})