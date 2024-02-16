import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './MainStack'
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';


type Props = {

}

const RootNavigation = (props: Props) => {
    const otp = useSelector((state: any) => state.AuthReducers.authOTP)
    return (
        <NavigationContainer>
            {otp === null ?
                <AuthStack /> :
                <MainStack />
            }
        </NavigationContainer>
    )
}

export default RootNavigation

