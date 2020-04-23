import * as types from './types';

export const setDocument = data => dispatch => {
  dispatch({
    type: types.SET_DOCUMENT,
    data,
  });
};

export const addDocument = data => dispatch => {
  dispatch({
    type: types.ADD_DOCUMENT,
    data,
  });
};
