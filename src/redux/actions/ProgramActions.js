import * as types from './types';

export const setProgramDetails = (data) => dispatch => {
    //console.log({data})
   dispatch({
    type: types.SET_PROGRAM_DETAILS,
    data,
  });
}


  

