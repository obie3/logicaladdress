import * as types from './types';

export const setExpoToken = (expoToken) => dispatch => {
   dispatch({
    type: types.SET_EXPO_TOKEN,
    expoToken,
  });
}

export const setProfile = (profile) => dispatch => {
  dispatch({
    type: types.SET_PROFILE,
    profile,
  });
}

export const setSessionToken = (sessionToken) => dispatch => {
  dispatch({
    type: types.SET_SESSION_TOKEN,
    sessionToken,
  });
}

export const setRegistrationStatus = (bool) => dispatch => {
  dispatch({
    type: types.REGISTRATION_STATUS,
    bool,
  });
}
export const logout = () => dispatch => {
  dispatch({
    type: types.LOG_OUT,
  });
}
  
export const login = (sessionToken) => dispatch => {
  dispatch({
    type: types.LOGIN,
    sessionToken
  });
}
  

