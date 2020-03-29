import * as types from './types';

export const setResources = (data) => dispatch => {
   dispatch({
    type: types.SET_RESOURCES,
    data,
  });
}


  

