import AsyncStorage from "@react-native-async-storage/async-storage";
import { AutoLoginAPI } from "../pages/auth/apis/AutoLogin";
import AsyncStorageUtil from "../utils/services/LocalCache";
import { AuthLoginAPI } from "../pages/auth/apis/AuthLogin";

export const Login = (username: string, token: string, tenant: string) => {
  return ({
    type: 'LOGIN',
    payload: { token, username, tenant }
  })
}

export const Init = () => {
  return async (dispatch: any) => {
    let token = await AsyncStorageUtil.getData('token')
      try {
        let data = await AutoLoginAPI();
        console.log(data, 'hit inside');
        if(data){
        dispatch({
          type: 'LOGIN',
          payload: token
        })}
      } catch (error) {
        console.log(error)
        let credentials = await AsyncStorageUtil.getData('user_credentials');
        console.log(credentials);
        if (credentials) {
          await AsyncStorageUtil.removeData('token')
          try {
            const user = await AuthLoginAPI({ credentials });
            const access_token = user?.data?.data?.access_token;
            if (access_token) {
              AsyncStorageUtil.saveData('token', access_token);
            }
            dispatch({
              type: 'LOGIN',
              payload: access_token
            })
          } catch (error) {
            console.log(error)
            await AsyncStorageUtil.clearAllData();
            dispatch({
              type: 'LOGOUT',
              payload: null
            })
          }
        } else {
          await AsyncStorageUtil.clearAllData();
          dispatch({
            type: 'LOGOUT',
            payload: null
          })
        }

      }
    }
}

export const Otp = (otp: any) => {
  return async (dispatch: any) => {
    let AUTH_OTP = null;
    if (otp === '111111') {
      AUTH_OTP = otp + '1234'
      console.log('token stored')
    }
    dispatch({
      type: 'OTP',
      payload: AUTH_OTP
    })
  }
}

export const Logout = () => {
  return async (dispatch: any) => {
    await AsyncStorageUtil.clearAllData();
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }
}