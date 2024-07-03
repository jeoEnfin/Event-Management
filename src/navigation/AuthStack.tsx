import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/auth/Login';
import { useSelector } from 'react-redux';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import Welcome from '../pages/auth/Welcome';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';


type Props = {}

const Stack = createNativeStackNavigator();

const AuthStack = (props: Props) => {

  const token = useSelector((state: any) => state.AuthReducers.authToken)

  return (

    <Stack.Navigator screenOptions={{ orientation: 'portrait', headerShown: false }}>
      {token === null ?
        <>
          {/* <Stack.Screen name='Welcome' component={Welcome}/> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </> :
        <Stack.Screen name="TFA" component={TwoFactorAuth} />}
    </Stack.Navigator>
  )
}

export default AuthStack

