import * as types from './types';

export const setPermissions = data => dispatch => {
  dispatch({
    type: types.SET_PERMISSIONS,
    data,
  });
};
