const initialState = {
    authToken: null,
    authOTP: null,
}
export default (state = initialState, action:any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authToken: action.payload,
            }
        case 'LOGOUT':
            return {
                authToken: null,
                authOTP: null,
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