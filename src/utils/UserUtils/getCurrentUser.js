import axios from 'axios';
import { API } from '../../constants/constants';

const getCurrentUser = onSuccess => {
  console.log(
    'BEARER BU BAK GİDEN ',
    JSON.parse(localStorage.getItem('access_token')).token
  );
  axios
    .get(API.API_URL + '/profile', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data.data))
    .catch(error => console.log(error));
};

const updateCurrentUser = (
  name,
  password,
  email,
  new_password,
  new_password_confirmation,
  onSuccess,
  onError
) => {
  axios
    .put(
      API.API_URL + '/profile',
      {
        name,
        password,
        email,
        new_password,
        new_password_confirmation,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => onError(error.response.data.message));
};
const currentUserUtils = {
  getCurrentUser,
  updateCurrentUser,
};
export default currentUserUtils;
