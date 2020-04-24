import * as types from './types';

export const setConnectionRequests = data => dispatch => {
  dispatch({
    type: types.SET_CONNECTION_REQUESTS,
    data,
  });
};
