import * as types from './types';

export const setSpeakers = (data) => dispatch => {
   dispatch({
    type: types.SET_SPEAKERS,
    data,
  });
}


  

