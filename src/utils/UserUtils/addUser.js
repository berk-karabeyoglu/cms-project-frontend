import axios from 'axios';
import { API } from '../../constants/constants';
import { authUtils } from '../authenticationUtils';

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
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
                },
            }
        )
        .then(response => onSuccess('User Created Successfully'))
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

const userAddUtil = {
    addUser,
};

export default userAddUtil;
