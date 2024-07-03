import AsyncStorage from "@react-native-async-storage/async-storage";

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
    console.log('token fetch')
    dispatch ({
      type: 'OTP',
      payload: token
    })
  }
 
}}

export const Otp = (otp: string) => {
  return async (dispatch: any) =>{
  let AUTH_OTP = null;
  if ( otp === '111111'){
    AUTH_OTP = otp + '1234'
    await AsyncStorage.setItem('token', AUTH_OTP);
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