import axios from 'axios';
import { API } from '../../constants/constants';

const updateUser = (
  id,
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
      API.API_URL + '/users',
      {
        id,
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
    .then(response => onSuccess('User Updated Successfully'))
    .catch(error => onError(error.response));
};

const userUpdateUtil = {
  updateUser,
};

export default userUpdateUtil;
