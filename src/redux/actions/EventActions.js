import * as types from './types';

export const setEventDetails = (data) => dispatch => {
   dispatch({
    type: types.SET_EVENT_DETAILS,
    data,
  });
}


  

