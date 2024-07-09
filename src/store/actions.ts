import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthLoginAPI } from "../pages/auth/apis/AuthLogin";
import { AutoLoginAPI } from "../pages/auth/apis/AutoLogin";

export const Login = (username: string, token: string, tenant: string) => {
    return ({
        type: 'LOGIN',
        payload: {token,username, tenant}
    })
}

export const Init = () => {
  return async (dispatch: any) =>{
  let token =  await AsyncStorage.getItem('token');
  if (token !== null){
    let data = await AutoLoginAPI();
    const user = data?.data?.data?.user?.data;
    if(user){
      dispatch ({
        type: 'LOGIN',
        payload: token
      })
    } else {
     Logout();
    }
  }
 
}}

export const Otp = (otp: any) => {
  return async (dispatch: any) =>{
  let AUTH_OTP = null;
  if ( otp === '111111'){
    AUTH_OTP = otp + '1234'
    console.log('token stored')
  }
  dispatch ({
    type: 'OTP',
    payload: AUTH_OTP
  })
}}

export const Logout = () => {
    return async (dispatch:any) =>{ 
      await AsyncStorage.clear();
      dispatch({
        type: 'LOGOUT',
        payload: null
    })}
}