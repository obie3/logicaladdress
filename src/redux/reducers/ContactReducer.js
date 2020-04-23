import * as types from '../actions/types';

const initialState = {
  contacts: [],
  constactsArray: {},
};
export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONTACT:
      return Object.assign({}, state, {
        contacts: action.data,
      });
    case types.ADD_CONTACT:
      return Object.assign({}, state, {
        contactsArray: { ...state.contactArray, ...action.contact },
        contacts: [...contactsArray],
      });
    default:
      return state;
  }
}
