import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/auth/Login';
import { useSelector } from 'react-redux';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import Welcome from '../pages/auth/Welcome';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import RoleSelector from '../pages/auth/RoleSelector';


type Props = {}

const Stack = createNativeStackNavigator();

const AuthStack = (props: Props) => {

  const token = useSelector((state: any) => state.AuthReducers.authToken);
  const userRole = useSelector((state: any) => state.AuthReducers.authRoleId);
  console.log(token, userRole)
  return (
    <Stack.Navigator screenOptions={{ orientation: 'portrait', headerShown: false }}>
      {(token === null && userRole === null) ?
        <>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </> :
        // <Stack.Screen name="TFA" component={TwoFactorAuth} />
        <Stack.Screen name="RoleSelector" component={RoleSelector} />
      }
    </Stack.Navigator>
  )
}

export default AuthStack

