import axios from 'axios';
import { API } from '../../constants/constants';

const addUser = (name, email, password, role, onSuccess, onError) => {
  axios
    .post(
      API.API_URL + '/users',
      {
        name,
        email,
        password,
        role,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess('User Created Successfully'))
    .catch(error => console.log(error.response));
};

const userAddUtil = {
  addUser,
};

export default userAddUtil;
