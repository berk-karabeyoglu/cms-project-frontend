import axios from 'axios';
import { API } from '../../constants/constants';

const getAllUsers = (search, onSuccess, onError) => {
  if ((search === '') | (search === undefined)) {
    axios
      .get(API.API_URL + '/users', {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      })
      .then(response => onSuccess(response.data.data))
      .catch(error => onError(error.response.message));
  } else {
    axios
      .get(API.API_URL + '/users?search=' + search, {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      })
      .then(response => console.log('ALOOOO', response))
      .catch(error => console.log('sladklşaskdlşakdlşas', error));
  }
};

const getUserByID = (userID, onSuccess, onError) => {
  console.log(userID);
  axios
    .get(API.API_URL + '/users/' + userID, {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data.data))
    .catch(error => onError(error => error.data.message));
};
const userGetUtils = {
  getAllUsers,
  getUserByID,
};

export default userGetUtils;
