import { AUTH_CONSTANTS, API } from '../constants/constants';
import axios from 'axios';

// Access token yoksa logine yonlendir
const validateAccessToken = () => {
  const token = localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);
  if (!token) {
    window.location = '/login';
    return false;
  }
  return true;
};

// Access token varsa dashboarda yonlendirmek icin 
const accessTokenChecker = () => {
  const token = localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);
  if (token) {
    window.location = '/admin';
    return false;
  }
  return true;
};

// Email veya token olmadan reset password ekranına gidilememesini saglamak icin
const queryStringValidationCheck = () => {
  const { token, email } = new Proxy(
    new URLSearchParams(window.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    }
  );
  return {
    token,
    email,
  };
};

const login = (email, password, onError) => {
  axios
    .post(API.API_URL + '/login', {
      email,
      password,
      device_name: 'TEST',
    })
    .then(response => {
      localStorage.setItem(
        'access_token',
        JSON.stringify({
          userLogin: true,
          token: response.data.token,
        })
      );
      window.location = '/admin/content-types';
    })
    .catch(error => {
      onError(error.response.data.message);
    });
};

const sendEmailForForgotPassword = (email, onSuccess, onError) => {
  axios
    .post(API.API_URL + '/password/reset', {
      email,
    })
    .then(response => {
      onSuccess(response.data.message);
    })
    .catch(error => {
      onError(error.response.data.message);
    });
};

const resetPassword = (password, password_confirmation, onSuccess, onError) => {
  const { token, email } = queryStringValidationCheck();
  axios
    .put(API.API_URL + '/password', {
      email,
      password,
      password_confirmation,
      token,
    })
    .then(response => {
      onSuccess(response.data.message);
    })
    .catch(error => {
      console.log(error.response);
      onError(error.response.data.message);
    });
};

export const authUtils = {
  validateAccessToken,
  accessTokenChecker,
  queryStringValidationCheck,
  login,
  sendEmailForForgotPassword,
  resetPassword,
};
