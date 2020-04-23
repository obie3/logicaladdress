import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DocumentReducer from './DocumentReducer';
import ProfileReducer from './ProfileReducer';
import LoginReducer from './LoginReducer';
import ContactReducer from './ContactReducer';

export default rootReducer = combineReducers({
  AuthReducer,
  ProfileReducer,
  LoginReducer,
  DocumentReducer,
  ContactReducer,
});
