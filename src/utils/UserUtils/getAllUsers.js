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
      .then(response => onSuccess(response.data.data))
      .catch(error => onError(error.response.message));
  }
};

const userGetUtils = {
  getAllUsers,
};

export default userGetUtils;
