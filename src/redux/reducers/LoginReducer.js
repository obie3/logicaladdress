import * as types from '../actions/types';

const initialState = {
    profile:{},
    sessionToken: null,
    expoToken: null,
    isLoggedIn: false,

}
export default function AuthReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_EXPO_TOKEN: 
            return Object.assign({}, state, {
                expoToken: action.expoToken,
            });
        case types.SET_SESSION_TOKEN:
            return Object.assign({}, state, {
                sessionToken : action.token,
            });
        case types.SET_PROFILE:
            return Object.assign({}, state, {
                profile: action.profile,
            });
        case types.LOG_OUT:
            return Object.assign({}, state, {
                sessionToken: null,
                isLoggedIn:false,
            });
        case types.LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                profile: action.profile,
            });
        case types.REGISTRATION_STATUS: 
            return Object.assign({}, state, {
                registered:action.bool,
            });   
         default:
            return state;

    }
}
