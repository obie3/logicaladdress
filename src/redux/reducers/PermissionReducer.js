import * as types from '../actions/types';

const initialState = {
  permissions: {},
};
export default function permissionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PERMISSIONS:
      return Object.assign({}, state, {
        permissions: action.data,
      });
    default:
      return state;
  }
}
