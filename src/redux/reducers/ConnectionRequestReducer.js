import * as types from '../actions/types';

const initialState = {
  connectionRequests: [],
};
export default function connectionRequestReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONNECTION_REQUESTS:
      return Object.assign({}, state, {
        connectionRequests: action.data,
      });
    default:
      return state;
  }
}
