import * as types from './types';
export const addProfile = profile => dispatch => {
  dispatch({
    type: types.ADD_PROFILE,
    profile,
  });
};

export const setProfile = profile => dispatch => {
  dispatch({
    type: types.SET_PROFILE,
    profile,
  });
};

export const setProfileFieldNames = profile => dispatch => {
  dispatch({
    type: types.SET_PROFILE_FIELD_NAMES,
    profile,
  });
};
