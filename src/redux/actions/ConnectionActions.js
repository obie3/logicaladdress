import * as types from './types';

export const setConnections = data => dispatch => {
  dispatch({
    type: types.SET_CONNECTIONS,
    data,
  });
};
