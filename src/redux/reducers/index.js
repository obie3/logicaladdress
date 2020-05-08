import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DocumentReducer from './DocumentReducer';
import ProfileReducer from './ProfileReducer';
import LoginReducer from './LoginReducer';
import ContactReducer from './ContactReducer';
import PermissionReducer from './PermissionReducer';
import ConnectionRequestReducer from './ConnectionRequestReducer';
import ConnectionReducer from './ConnectionReducer';
import NotificationReducer from './NotificationReducer';

export default rootReducer = combineReducers({
  AuthReducer,
  ProfileReducer,
  LoginReducer,
  DocumentReducer,
  ContactReducer,
  PermissionReducer,
  ConnectionRequestReducer,
  ConnectionReducer,
  NotificationReducer,
});
