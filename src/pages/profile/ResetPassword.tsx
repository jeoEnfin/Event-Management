import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import InputText from '../../components/common/InputText'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'
import * as Yup from 'yup';
import { Formik } from 'formik'

type Props = {}

type ResetPasswords = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

const ResetPassword = (props: Props) => {
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [isTextSecure2, setIsTextSecure2] = useState<boolean>(true);

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().min(1, 'Old password is required')
            .required('Old Password is required'),
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
            .required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const handleResetPassword = async (data: ResetPasswords) => {
        console.log('data', data)
    }

    const showPassword = () => {
        setIsTextSecure(!isTextSecure)
    }

    const showPassword2 = () => {
        setIsTextSecure2(!isTextSecure2)
    }

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={{ marginHorizontal: 8, justifyContent: 'space-between', flex: 1 }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={(values) => {
                            handleResetPassword(values);
                        }}
                    >
                        {({ handleSubmit, setFieldTouched, setFieldValue, values, errors, touched }) => (
                            <>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.container}>
                                    <View style={{ padding: 10, gap: 20, marginTop: 40 }}>
                                        <InputText
                                            label='Current Password'
                                            placeholder='Current Password'
                                            autoComplete='password'
                                            textSecure={isTextSecure}
                                            iconName='eye-outline'
                                            showText={() => { showPassword() }}
                                            inputMode={'text'}
                                            onDataChanged={(value) => setFieldValue('currentPassword', value)}
                                            error={!!(errors.currentPassword && touched.currentPassword)}
                                            errorTxt={(touched.currentPassword && touched.currentPassword) ? errors.currentPassword : ''}
                                            value={values.currentPassword}
                                            onBlur={() => setFieldTouched('currentPassword', true)}
                                            backgroundColor={COLORS._background.main}
                                        />
                                        <InputText
                                            label='New Password'
                                            placeholder='New Password'
                                            autoComplete='password'
                                            textSecure={isTextSecure2}
                                            showText={() => { showPassword2() }}
                                            inputMode={'text'}
                                            iconName='eye-outline'
                                            onDataChanged={(value) => setFieldValue('newPassword', value)}
                                            error={!!(errors.newPassword && touched.newPassword)}
                                            errorTxt={(touched.newPassword && touched.newPassword) ? errors.newPassword : ''}
                                            value={values.newPassword}
                                            onBlur={() => setFieldTouched('newPassword', true)}
                                            backgroundColor={COLORS._background.main}
                                        />
                                        <InputText
                                            label='Confirm Password'
                                            placeholder='Confirm Password'
                                            autoComplete='password'
                                            textSecure={false}
                                            showText={() => { }}
                                            inputMode={'text'}
                                            onDataChanged={(value) => setFieldValue('confirmPassword', value)}
                                            error={!!(errors.confirmPassword && touched.confirmPassword)}
                                            errorTxt={(touched.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                                            value={values.confirmPassword}
                                            onBlur={() => setFieldTouched('confirmPassword', true)}
                                            backgroundColor={COLORS._background.main}
                                        />
                                    </View>
                                </ScrollView>
                                <View style={{ width: '100%', paddingHorizontal: 10, marginBottom: 20 }}>
                                    <Button
                                        label='Save'
                                        // loading={isLoading}
                                        buttonClick={handleSubmit}
                                    />
                                </View>
                            </>)}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        //justifyContent: 'center',
    },
})