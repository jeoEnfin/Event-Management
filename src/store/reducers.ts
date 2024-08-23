import { config } from "../utils/config"

const initialState = {
    authToken: null,
    authOTP: null,
    authUsername: null,
    authTenent: config.DEFAULT_TENANT,
    authRoleId: null,
    authentication: false,
    initialUpdate: false
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authToken: action.payload.token,
                authUsername: action.payload.username,
            }
        case 'LOGOUT':
            return {
                authToken: null,
                authOTP: null,
                authUsername: null,
                authTenent: state.authTenent,
                authRoleId: null,
                authentication: false
            }
        case 'OTP':
            return {
                ...state,
                authOTP: action.payload,
            }
        case 'ROLE':
            return {
                ...state,
                authRoleId: action.payload.roleId,
                authentication: action.payload.authentication
            }
        case 'AUTH':
            return {
                ...state,
                authentication: action.payload
            }
        case 'TENANT_ID':
            return {
                ...state,
                authTenent: action.payload
            }
        case 'SET_STATE':
            return {
                ...state,
                initialUpdate: action.payload,
            };
        default:
            return state;
    }
}