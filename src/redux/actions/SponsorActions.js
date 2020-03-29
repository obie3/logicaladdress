import * as types from './types';

export const setSponsorDetails = (data) => dispatch => {
    //console.log({data})
   dispatch({
    type: types.SET_SPONSOR_DETAILS,
    data,
  });
}


  

