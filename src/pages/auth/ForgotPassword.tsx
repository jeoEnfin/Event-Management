import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, {useState } from 'react'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import InputText from '../../components/common/InputText'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'
import { useNavigation } from '@react-navigation/native'
import { ForgotPasswordAPI } from './apis/ForgotPasswordApi'
import AuthLogo from './common/AuthLogo'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux'
import { showToast } from '../../store/toast/ToastActions'

type Props = {}

const ForgotPassword = (props: Props) => {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const platformName = Platform.OS;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email format'
            )
            .required('Email is required')
    });

    const initialValues = {
        email: ''
    };

    const handleSubmit = async (data: any) => {
            setIsLoading(true)
            const _data = {
                email: data.email.toLowerCase()
            }
            try {
                const forgotPasswordResponse = await ForgotPasswordAPI({ data: _data })
                console.log(forgotPasswordResponse.data.data)
                if (forgotPasswordResponse.data.data) {
                    dispatch(showToast(`${forgotPasswordResponse.data.data} to your email address ${data.email}`, 'success'))
                }
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
                if (e.response.data.message) {
                    dispatch(showToast(`Email send successfully to your email address ${data.email}`, 'success'))
                }
                else {
                    dispatch(showToast(`Something went wrong/Network error`, 'error'))
                }
            }
        }
    

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ handleSubmit, setFieldTouched, setFieldValue, values, errors, touched, resetForm }) => (
                        <>
                            <View>
                                {/* <AuthLogo /> */}
                                <AuthHeader
                                    title='Forgot Password?'
                                    subTitle='Submit your registered email below.'
                                />
                                <View style={{ marginTop: 15, gap: 6 }}>
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
                                </View>
                                <View style={styles.infoTxtBody}>
                                    <Text style={styles.infoTxt}>A link will be sent to your email to reset your password.</Text>
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
                            </View></>
                    )}</Formik>
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