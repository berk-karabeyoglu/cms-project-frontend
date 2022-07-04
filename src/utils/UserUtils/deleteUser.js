import axios from 'axios';
import { API } from '../../constants/constants';
import { authUtils } from '../authenticationUtils';

const deleteUser = (userID, onSuccess, onError) => {
    axios
        .delete(API.API_URL + '/users/' + userID, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
            },
        })
        .then(response => onSuccess('User deleted successfully!'))
        .catch(error => {
            if (error.response.status === 401) {
                authUtils.logOutHandle();
            } else if (error.response.status === 403) {
                return (window.location.href = 'http://localhost:3000/error/403');
            } else {
                onError(error.response.data.message);
            }
        });
};

const userDeleteUtil = {
    deleteUser,
};

export default userDeleteUtil;
