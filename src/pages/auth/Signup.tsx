import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthLogo from './common/AuthLogo'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputText from '../../components/common/InputText'
import Button from '../../components/common/Button'
import CustomIconButton from '../../components/common/CustomIconButton'
import { COLORS } from '../../constants'
import { SignupAPI } from './apis/SignupApi'
import googleConfig from '../../utils/services/GoogleSigninConfig'


type Props = {}

type UserSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = (props: Props) => {
    const navigation: any = useNavigation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    useEffect(() => {
        googleConfig();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [Keyboard]);

    const handleSignUp = async (data: UserSignup) => {
        //console.log(data, 'data')
        setIsLoading(true)
        if (data) {
            const _data = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email.toLowerCase(),
                password: data.password,
            }
            try {
                const _signUp = await SignupAPI({ data: _data });
                if (_signUp) {
                    Alert.alert('Registration Successful', 'You have successfully signed up.', [
                        { text: 'OK', onPress: () => { navigation.navigate('Login') } },
                    ]);
                    setTimeout(() => {
                        navigation.navigate('Login')
                    }, 500)
                }
                setIsLoading(false);
            } catch (err: any) {
                console.log(err?.response?.data?.message);
                let message = err?.response?.data?.message;
                if (message) {
                    Alert.alert(message[0], '');
                }
                setIsLoading(false);
            }
        }
    }

    const showPassword = () => {
        setIsTextSecure(!isTextSecure)
    }

    return (
        <AuthContainer>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* <AuthLogo /> */}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(values) => {
                        handleSignUp(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldValue, values, errors, touched }) => (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.container}>
                                <AuthHeader
                                    title='Sign up'
                                    subTitle={`Already have an account?`}
                                    isLinkButton={true}
                                    linkButtonLabel='Login'
                                    linkButtonClick={() => { navigation.navigate('Login') }}
                                />
                                <View style={{ gap: 10, paddingVertical: 5 }}>
                                    <InputText
                                        label='First Name'
                                        placeholder='First Name'
                                        autoComplete='name'
                                        textSecure={false}
                                        showText={() => { }}
                                        inputMode={'text'}
                                        onDataChanged={(value) => setFieldValue('firstName', value)}
                                        error={!!(errors.firstName && touched.firstName)}
                                        errorTxt={(touched.firstName && errors.firstName) ? errors.firstName : ''}
                                        value={values.firstName}
                                        onBlur={() => setFieldTouched('firstName', true)}
                                        backgroundColor={COLORS._background.primary}
                                    />
                                    <InputText
                                        label='Last Name'
                                        placeholder='Last Name'
                                        autoComplete='additional-name'
                                        textSecure={false}
                                        showText={() => { }}
                                        inputMode={'text'}
                                        onDataChanged={(value) => setFieldValue('lastName', value)}
                                        error={!!(errors.lastName && touched.lastName)}
                                        errorTxt={(touched.lastName && errors.lastName) ? errors.lastName : ''}
                                        value={values.lastName}
                                        onBlur={() => setFieldTouched('lastName', true)}
                                        backgroundColor={COLORS._background.primary}
                                    />
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
                                        onBlur={() => setFieldTouched('email', true)}
                                        backgroundColor={COLORS._background.primary}
                                    />
                                    <InputText
                                        label='Password'
                                        placeholder='Password'
                                        iconName='eye-outline'
                                        autoComplete='off'
                                        textSecure={isTextSecure}
                                        showText={showPassword}
                                        inputMode={'text'}
                                        onDataChanged={(value) => setFieldValue('password', value)}
                                        error={!!(errors.password && touched.password)}
                                        errorTxt={(touched.password && touched.password) ? errors.password : ''}
                                        value={values.password}
                                        onBlur={() => { setFieldTouched('password', true) }}
                                        backgroundColor={COLORS._background.primary}
                                    />
                                    <InputText
                                        label='Confirm Password'
                                        placeholder='Confirm Password'
                                        autoComplete='off'
                                        textSecure={false}
                                        showText={() => { }}
                                        inputMode={'text'}
                                        onDataChanged={(value) => setFieldValue('confirmPassword', value)}
                                        error={!!(errors.confirmPassword && touched.confirmPassword)}
                                        errorTxt={(touched.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                                        value={values.confirmPassword}
                                        onBlur={() => { setFieldTouched('confirmPassword', true) }}
                                        backgroundColor={COLORS._background.primary}
                                    />
                                </View>
                            </ScrollView>
                            <View style={{ marginTop: 7 }}>
                                <Button label='Signup' buttonClick={handleSubmit} loading={isLoading} />
                            </View>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>
            {!keyboardVisible &&
                <>
                    <View style={styles.signupBody}>
                        <Text style={styles.signupTxt}>or continue with</Text>
                    </View>
                    <View style={styles.socialBtn}>
                        <CustomIconButton
                            imageUrl={require('../../assets/ci/google.png')}
                        //onClick={() => googleLoginHandler()}
                        />
                        {Platform.OS === 'ios' &&
                            <CustomIconButton
                                imageUrl={require('../../assets/ci/apple-logo.png')}
                            // onClick={() => googleLoginHandler()}
                            />}
                    </View></>}
        </AuthContainer >
    )
}

export default Signup

const styles = StyleSheet.create({
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
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
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
})