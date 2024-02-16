
export const Login = (username: string, password: string) => {
    let token = null;
    if (username === 'jeothankachan98@gmail.com' && password === 'Abcd1234@')
    {
        token = username + password;
    } 
    return ({
        type: 'LOGIN',
        payload: token
    })
}

export const Otp = (otp: string) => {
  let AUTH_OTP = null;
  if ( otp === '111111'){
    AUTH_OTP = otp + '1234'
  }
  return ({
    type: 'OTP',
    payload: AUTH_OTP
  })
}

export const Logout = () => {
    return ({
        type: 'LOGOUT',
        payload: null
    })
}