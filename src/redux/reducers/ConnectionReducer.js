import * as types from '../actions/types';

const initialState = {
  connections: [],
  tempArray: {},
};
export default function connectionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONNECTIONS:
      return Object.assign({}, state, {
        connections: action.data,
      });
    case types.ADD_CONNECTION:
      return Object.assign({}, state, {
        tempArray: { ...state.tempArray, ...action.contact },
        connections: [...tempArray],
      });
    default:
      return state;
  }
}
