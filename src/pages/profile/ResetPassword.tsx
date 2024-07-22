import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import InputText from '../../components/common/InputText'
import { COLORS } from '../../constants'
import Button from '../../components/common/Button'

type Props = {}

const ResetPassword = (props: Props) => {
    return (
        <ScreenWrapper>
            <View style={{width: '100%',marginHorizontal: 8,justifyContent: 'space-between',flex: 1}}>
                <View style={{ padding: 10, gap: 20, marginTop: 40 }}>
                    <InputText
                        label='Current Password'
                        placeholder='Current Password'
                        autoComplete='password'
                        textSecure={true}
                        showText={() => { }}
                        inputMode={'text'}
                        //   defaultValue={data.name || ''}
                        //   onDataChanged={handleNameChange}
                        //   error={errorName}
                        //   errorTxt={nameErrorTxt}
                        backgroundColor={COLORS._background.main}
                    />
                    <InputText
                        label='New Password'
                        placeholder='New Password'
                        autoComplete='password'
                        textSecure={true}
                        showText={() => { }}
                        inputMode={'text'}
                        //   defaultValue={data.email || ''}
                        //   onDataChanged={handleEmailChange}
                        //   error={errorEmail}
                        //   errorTxt={emailErrorTxt}
                        backgroundColor={COLORS._background.main}
                    />
                    <InputText
                        label='Confirm Password'
                        placeholder='Confirm Password'
                        autoComplete='password'
                        textSecure={true}
                        showText={() => { }}
                        inputMode={'text'}
                        //   defaultValue={data.email || ''}
                        //   onDataChanged={handleEmailChange}
                        //   error={errorEmail}
                        //   errorTxt={emailErrorTxt}
                        backgroundColor={COLORS._background.main}
                    />
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10, marginBottom: 20 }}>
                    <Button
                        label='Save'
                    // loading={isLoading}
                    // buttonClick={handleUpdate}
                    />
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default ResetPassword

const styles = StyleSheet.create({})