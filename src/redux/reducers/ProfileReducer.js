import * as types from '../actions/types';

const initialState = {
  profile: {},
  profileFieldNames: {},
};
export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PROFILE:
      let profileFields = state.profile.profileFields.concat(action.profile);
      return {
        ...state,
        profile: { ...state.profile, profileFields },
      };
    case types.SET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });

    case types.EDIT_PROFILE_ITEM:
      let tempArray = state.profile.profileFields;
      let newTempArray = tempArray.filter(item => item.id !== action.item.id);
      let tempArray2 = newTempArray.concat(action.item);
      return {
        ...state,
        profile: { ...state.profile, profileFields: tempArray2 },
      };

    case types.DELETE_PROFILE_ITEM:
      let profileArray = state.profile.profileFields;
      let result = profileArray.filter(item => item.id !== action.item);
      return {
        ...state,
        profile: { ...state.profile, profileFields: result },
      };

    case types.SET_PROFILE_FIELD_NAMES:
      return Object.assign({}, state, {
        profileFieldNames: action.profileFieldNames,
      });
    default:
      return state;
  }
}
