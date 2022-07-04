import axios from 'axios';
import { API } from '../../constants/constants';
import { authUtils } from '../authenticationUtils';

const getCurrentUser = onSuccess => {
    console.log('BEARER BU BAK GİDEN ', JSON.parse(localStorage.getItem('access_token')).token);
    axios
        .get(API.API_URL + '/profile', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
            },
        })
        .then(response => onSuccess(response.data.data))
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

const updateCurrentUser = (name, password, email, new_password, new_password_confirmation, onSuccess, onError) => {
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
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
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
