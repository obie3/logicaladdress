import * as types from './types';

export const setContact = data => dispatch => {
  dispatch({
    type: types.SET_CONTACT,
    data,
  });
};

export const addContact = data => dispatch => {
  dispatch({
    type: types.ADD_CONTACT,
    data,
  });
};
