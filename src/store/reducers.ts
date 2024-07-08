const initialState = {
    authToken: 1234,
    authOTP: null,
    authUsername: null,
    authTenent: null,
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authToken: action.payload.token,
                authUsername: action.payload.username,
                authTenent: action.payload.tenent
            }
        case 'LOGOUT':
            return {
                authToken: null,
                authOTP: null,
                authUsername: null,
                authTenent: null,
            }
        case 'OTP':
            return {
                ...state,
                authOTP: action.payload,
            }
        default:
            return state;
    }
}