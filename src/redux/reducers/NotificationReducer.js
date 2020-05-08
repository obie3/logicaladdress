import * as types from '../actions/types';

const initialState = {
  notifications: {},
  count: 0,
};
export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: action.data,
      });
    case types.ADD_NOTIFICATION:
      let data = state.notifications.data.concat(action.data);
      return {
        ...state,
        notifications: { ...state.notifications, data },
      };
    case types.ADD_NOTIFICATION_COUNT:
      let newCount = state.count + 1;
      return {
        ...state,
        count: newCount,
      };
    case types.RESET_NOTIFICATION_COUNT:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}
