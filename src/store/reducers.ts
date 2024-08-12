const initialState = {
    authToken: null,
    authOTP: null,
    authUsername: null,
    authTenent: 'dev_tenant_default',
    authRoleId: null,
    authentication: false
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
                authTenent: 'dev_tenant_default',
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
            return{
                ...state,
                authentication: action.payload
            }
        case 'TENANT_ID':
            return{
               ...state,
                authTenent: action.payload
            }
        default:
            return state;
    }
}