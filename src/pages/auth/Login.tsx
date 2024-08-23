import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import RoundButton from '../../components/RoundButton';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail, isValidPassword } from '../../utils/validations';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import googleConfig from '../../utils/services/GoogleSigninConfig';
import { useDispatch } from 'react-redux';
import { GuestLogin, Login, Role } from '../../store/actions';
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
import AuthLogo from './common/AuthLogo';
import { showToast } from '../../store/toast/ToastActions';
import * as Yup from 'yup';
import { Formik } from 'formik';





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
    const platformName = Platform.OS;
    const [errorTxt, setErrorTxt] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rememberCheck, setRememberCheck] = useState<boolean>(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
          )
        .required('Email is required'),
        password: Yup.string()
            .min(1, 'Password must be at least 1 characters')
            .required('Password is required')
    });

    useEffect(() => {
        googleConfig();
    }, []);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleLogin = async (data: any) => {
        setIsLoading(true);
        const _data = {
            email: data?.email.toLowerCase(),
            password: data?.password
        }
        try {
            const userData = await AuthLoginAPI({ data: _data });
            const access_token = userData?.data?.data?.access_token;
            const tenant = userData?.data?.data?.tenant;
            const _user = userData?.data?.data?.user;
            if (access_token) {
                await AsyncStorageUtil.saveData('token', access_token);
            }
            if (tenant) {
                await AsyncStorageUtil.saveData('user_tenant_id', tenant)
            }
            if (rememberCheck) {
                await AsyncStorageUtil.saveData('user_credentials', data)
            }
            if (_user) {
                await AsyncStorageUtil.saveData('userData', _user)
                if (_user?.roleId) {
                    dispatch(Role(_user?.roleId));
                }
                else if (_user?.roles.length > 0) {
                    await AsyncStorageUtil.saveData('userRoles', _user?.roles);
                }
            }
            dispatch(Login(username, access_token))
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error.response)
            if (error?.response?.data?.message) {
                dispatch(showToast(error?.response?.data?.message, 'error'));
            } else {
                dispatch(showToast('Something went wrong', 'warning'));
            }
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

    const handleLoginAsGuest = () => {
        dispatch(GuestLogin());
    }

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}>
                <View>
                    {/* <AuthLogo /> */}
                    <AuthHeader
                        title='Welcome Back'
                        subTitle={`Don't have an account?`}
                        isLinkButton={true}
                        linkButtonLabel='Sign up'
                        linkButtonClick={() => { navigation.navigate('Signup') }}
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={(values) => {
                            handleLogin(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldValue, values, errors, touched ,resetForm}) => (
                            <>
                                <ScrollView>
                                    <View style={{ marginTop: 10, gap: 10 }}>
                                        <InputText
                                            label='Email'
                                            placeholder='Email'
                                            autoComplete='email'
                                            textSecure={false}
                                            showText={() => { }}
                                            inputMode={'email'}
                                            onDataChanged={(value) => setFieldValue('email', value)}
                                            error={!!(errors.email && touched.email)}
                                            errorTxt={(touched.email && touched.email) ? errors.email : ''}
                                            value={values.email}
                                            onFocus={() => setFieldTouched('email', true)}
                                            onBlur={() => setFieldTouched('email', true)}
                                            backgroundColor={COLORS._background.primary}
                                        />
                                        <InputText
                                            label='Password'
                                            placeholder='Password'
                                            iconName='eye-outline'
                                            autoComplete='new-password'
                                            textSecure={isTextSecure}
                                            showText={showPassword}
                                            inputMode={'text'}
                                            onDataChanged={(value) => setFieldValue('password', value)}
                                            error={!!(errors.password && touched.password)}
                                            errorTxt={(touched.password && touched.password) ? errors.password : ''}
                                            value={values.password}
                                            onFocus={() => setFieldTouched('email', true)}
                                            onBlur={() => { setFieldTouched('password', true) }}
                                            backgroundColor={COLORS._background.primary}
                                        />
                                    </View>
                                    <View style={styles.forgotBody}>
                                        <CheckboxWithLabel
                                            label='Remember me'
                                            isChecked={rememberCheck}
                                            onPress={() => { setRememberCheck(!rememberCheck) }}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            resetForm();
                                            ForgotPasswordRoute() }}>
                                            <Text style={styles.fgtTxt}>Forgot password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <Button label='Login' buttonClick={handleSubmit} loading={isLoading} />
                            </>
                        )}</Formik>
                </View>
                <View>

                    <View style={styles.signupBody}>
                        <Text style={styles.signupTxt}>or continue with</Text>
                    </View>
                    <Button label='Login as guest' variant='outline' buttonClick={() => { handleLoginAsGuest() }} />
                    <View style={styles.socialBtn}>
                        <CustomIconButton
                            imageUrl={require('../../assets/ci/google.png')}
                            onClick={() => googleLoginHandler()}
                        />
                        {Platform.OS === 'ios' &&
                            <CustomIconButton
                                imageUrl={require('../../assets/ci/apple-logo.png')}
                            // onClick={() => googleLoginHandler()}
                            />}
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
        marginVertical: 20,
        gap: 15,
        paddingHorizontal: 5
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