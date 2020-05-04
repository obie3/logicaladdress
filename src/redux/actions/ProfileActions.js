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

export const editProfileItem = item => dispatch => {
  dispatch({
    type: types.EDIT_PROFILE_ITEM,
    item,
  });
};

export const deleteProfileItem = item => dispatch => {
  dispatch({
    type: types.DELETE_PROFILE_ITEM,
    item,
  });
};

export const setProfileFieldNames = profileFieldNames => dispatch => {
  dispatch({
    type: types.SET_PROFILE_FIELD_NAMES,
    profileFieldNames,
  });
};
