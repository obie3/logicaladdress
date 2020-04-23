import * as types from '../actions/types';

const initialState = {
  profile: {},
  profileFieldNames: {},
};
export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PROFILE:
      return Object.assign({}, state, {
        profile: { ...state.profile, ...action.profile },
      });

    case types.SET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });

    case types.SET_PROFILE_FIELD_NAMES:
      return Object.assign({}, state, {
        profileFieldNames: action.profile,
      });
    default:
      return state;
  }
}
