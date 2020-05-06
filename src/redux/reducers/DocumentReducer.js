import * as types from '../actions/types';
let tempDoc = [];

const initialState = {
  documents: {},
};
export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_DOCUMENT:
      return Object.assign({}, state, {
        documents: action.data,
      });
    case types.ADD_DOCUMENT:
      let data = state.documents.data.concat(action.data);
      return {
        ...state,
        documents: { ...state.documents, data },
      };
    default:
      return state;
  }
}
