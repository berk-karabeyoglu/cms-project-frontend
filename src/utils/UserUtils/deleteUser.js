import axios from 'axios';
import { API } from '../../constants/constants';

const deleteUser = (userID, onSuccess, onError) => {
  axios
    .delete(API.API_URL + '/users/' + userID, {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess("User deleted successfully!"))
    .catch(error => onError("Error occured!"));
};

const userDeleteUtil = {
    deleteUser
}

export default userDeleteUtil;
