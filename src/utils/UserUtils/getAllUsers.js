import axios from 'axios';
import { API } from '../../constants/constants';

const getAllUsers = (onSuccess, onError) => {
  axios
    .get(API.API_URL + '/users', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data.data))
    .catch(error => onError(error.response.message));
};

const userGetUtils = {
    getAllUsers
}

export default userGetUtils;
