import * as types from '../actions/types';

const initialState = {
  profile: {},
  sessionToken: null,
  isLoggedIn: false,
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SESSION_TOKEN:
      return Object.assign({}, state, {
        sessionToken: action.token,
      });
    case types.SET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });
    case types.LOG_OUT:
      return Object.assign({}, state, {
        sessionToken: null,
        isLoggedIn: false,
      });
    case types.LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        profile: action.profile,
      });
    default:
      return state;
  }
}
