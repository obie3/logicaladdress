import * as types from './types';

export const setNotification = data => dispatch => {
  dispatch({
    type: types.SET_NOTIFICATION,
    data,
  });
};

export const addNotification = data => dispatch => {
  dispatch({
    type: types.ADD_NOTIFICATION,
    data,
  });
};

export const resetNotificationCount = () => dispatch => {
  dispatch({
    type: types.RESET_NOTIFICATION_COUNT,
  });
};

export const addNotificationCount = () => dispatch => {
  dispatch({
    type: types.ADD_NOTIFICATION_COUNT,
  });
};
