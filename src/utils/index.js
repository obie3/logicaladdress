import { AsyncStorage } from 'react-native';
const ENDPOINT = 'https://logicaladdress-api.herokuapp.com/api/v1/';
const generateOTPEndpoint = `${ENDPOINT}otp/generate`;
const RegistrationEndpoint = `${ENDPOINT}auth/register`;
const VerifyOTPEndpoint = `${ENDPOINT}otp/verify`;
const ProfileEndpoint = `${ENDPOINT}auth/me`;
const UpdateProfileEndpoint = `${ENDPOINT}profile/`;
const AddProfileFieldEndpoint = `${ENDPOINT}profile/`;
const FetchProfileField = `${ENDPOINT}profile/fields`;
const AddDocumentEndpoint = `${ENDPOINT}credentials`;
const GetDocumentsEndpoint = `${ENDPOINT}credentials`;
const RequestConnectionEndpoint = `${ENDPOINT}permissions/requests`;
const PermissionsEndpoint = `${ENDPOINT}permissions`;
const FetchConnectionRequestEndpoint = `${ENDPOINT}permissions/requests`;
const LookupLogicalAddressEndpoint = `${ENDPOINT}lookup/`;

export {
  generateOTPEndpoint,
  RegistrationEndpoint,
  VerifyOTPEndpoint,
  ProfileEndpoint,
  UpdateProfileEndpoint,
  AddProfileFieldEndpoint,
  FetchProfileField,
  AddDocumentEndpoint,
  GetDocumentsEndpoint,
  RequestConnectionEndpoint,
  PermissionsEndpoint,
  LookupLogicalAddressEndpoint,
  FetchConnectionRequestEndpoint,
};

export const isEmailValid = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isPhoneValid = phone => {
  let regex = /^[a-zA-Z]+$/;
  let res = phone.toString().trim();
  if (!phone || res.length < 11 || res.length > 11) return false;
  if (res.match(regex)) return false;
  return true;
};

export const isEmpty = str => {
  return !str || 0 === str.toString().trim().length;
};

export const saveToLocalStorage = async (
  name = null,
  email = null,
  phone = null,
  data = null,
) => {
  const profile = {
    name,
    email,
    phone,
    data,
  };
  await AsyncStorage.setItem('profile', JSON.stringify(profile));
  return true;
};

export const fetchProfile = async () => {
  return await AsyncStorage.getItem('profile').then(value => {
    if (value) {
      return JSON.parse(value);
    }
    return false;
  });
};

export const fetchToken = async () => {
  //await AsyncStorage.clear();
  return await AsyncStorage.getItem('token').then(value => {
    if (value) {
      return JSON.parse(value);
    }
    return false;
  });
};

export const saveToken = async token => {
  const profile = { token };
  await AsyncStorage.setItem('token', JSON.stringify(profile));
  return true;
};

export const logout = async () => {
  let keys = ['token', 'profile'];
  return await AsyncStorage.multiRemove(keys, err => {});
};

export const getProfile = async () => {
  return await AsyncStorage.getItem('profile').then(value => {
    if (value) {
      return JSON.parse(value);
    } else {
      return false;
    }
  });
};

export const saveExpoToken = async expoToken => {
  return await AsyncStorage.setItem('expoToken', expoToken);
};

export const getExpoToken = async () => {
  return await AsyncStorage.getItem('expoToken').then(value => {
    if (value) {
      return value;
    } else {
      return false;
    }
  });
};
