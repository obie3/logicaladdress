import * as types from './types';

export const setAttendees = (data) => dispatch => {
   dispatch({
    type: types.SET_ATTENDEES,
    data,
  });
}


  

