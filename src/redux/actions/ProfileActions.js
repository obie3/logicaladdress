import * as types from './types';
export const addProfile = (profile) => dispatch => {
   dispatch({
    type: types.ADD_PROFILE,
     profile
  });
}

  



