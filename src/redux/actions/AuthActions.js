import * as types from './types';

export const setProfile = profile => dispatch => {
  dispatch({
    type: types.SET_PROFILE,
    profile,
  });
};

export const setSessionToken = sessionToken => dispatch => {
  dispatch({
    type: types.SET_SESSION_TOKEN,
    sessionToken,
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: types.LOG_OUT,
  });
};

export const login = sessionToken => dispatch => {
  dispatch({
    type: types.LOGIN,
    sessionToken,
  });
};
