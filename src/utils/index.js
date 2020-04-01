import { AsyncStorage } from 'react-native';
const ENDPOINT = 'https://logicaladdress-api.herokuapp.com/api/v1/';
const generateOTPEndpoint = `${ENDPOINT}otp/generate`;
const RegistrationEndpoint = `${ENDPOINT}auth/register`;
const VerifyOTPEndpoint = `${ENDPOINT}otp/verify`;
const ProfileEndpoint = `${ENDPOINT}auth/profile`;

export {
  generateOTPEndpoint,
  RegistrationEndpoint,
  VerifyOTPEndpoint,
  ProfileEndpoint,
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
  imageUrl = null,
) => {
  const profile = {
    name,
    email,
    phone,
    imageUrl,
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

export const sendRoute = async (endpoint, body) => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    const res_1 = await res.json();
    return res_1;
  } catch (error) {
    return error;
  }
};

export const post = async (endpoint, body, token) => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: `JWT ${token}`,
      },
      body: body,
    });
    const res_1 = await res.json();
    return res_1;
  } catch (error) {
    return error;
  }
};

export const getRoute = async (endpoint, token) => {
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const res_1 = await res.json();
    return res_1;
  } catch (error) {
    return error;
  }
};

export const putRoute = async (endpoint, body, token) => {
  try {
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: `JWT ${token}`,
      },
      body: body,
    });
    const res_1 = await res.json();
    return res_1;
  } catch (error) {
    return error;
  }
};

export const saveProfile = async (id, name, sessionToken, status) => {
  let profile = {
    id,
    name,
    sessionToken,
  };

  await AsyncStorage.setItem('isAccountVerified', JSON.stringify(status));
  return await AsyncStorage.setItem('profile', JSON.stringify(profile));
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

export const getVerification = async () => {
  return await AsyncStorage.getItem('isAccountVerified').then(value => {
    if (value) {
      return JSON.parse(value);
    } else {
      return false;
    }
  });
};

export const updateVerification = async () => {
  return await AsyncStorage.setItem('isAccountVerified', JSON.stringify(true));
};

export const updateOnBoarding = async () => {
  return await AsyncStorage.setItem('completed', JSON.stringify(true));
};

export const getOnBoardingStatus = async () => {
  return await AsyncStorage.getItem('completed')
    .then(value => {
      if (value) {
        return JSON.parse(value);
      } else {
        return false;
      }
    })
    .catch(error => error);
};

/// fix splash screen for dashboard
/// fix mult role for users,
// switch not updating
