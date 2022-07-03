import axios from 'axios';
import { API } from '../../constants/constants';
import { authUtils } from '../authenticationUtils';

const updateUser = (id, name, password, email, new_password, new_password_confirmation,role, onSuccess, onError) => {
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
                role
            },
            {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
                },
            }
        )
        .then(response => onSuccess('User Updated Successfully'))
        .catch(error => {
            if (error.response.status === 401) {
                authUtils.logOutHandle();
            } else if (error.response.status === 403) {
                window.location.href = 'http://localhost:3000/error/403';
            } else {
                console.log(error.response.data.message);
            }
        });
};

const userUpdateUtil = {
    updateUser,
};

export default userUpdateUtil;
