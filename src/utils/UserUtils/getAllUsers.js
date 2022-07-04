import axios from 'axios';
import { API } from '../../constants/constants';
import { authUtils } from '../authenticationUtils';

const getAllUsers = (search, onSuccess, onError) => {
    if ((search === '') | (search === undefined)) {
        axios
            .get(API.API_URL + '/users', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
                },
            })
            .then(response => onSuccess(response.data.data))
            .catch(error => {
                if (error.response.status === 401) {
                    authUtils.logOutHandle();
                } else if (error.response.status === 403) {
                    return (window.location.href = 'http://localhost:3000/error/403');
                } else {
                    onError(error.response.data.message);
                }
                console.log(error.response.status);
            });
    } else {
        console.log("ARANAN KELİME ",search)
        axios
            .get(API.API_URL + '/users?search=' + search, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
                },
            })
            .then(response => onSuccess(response.data.data))
            .catch(error => onError(error));
    }
};

const getUserByID = (userID, onSuccess, onError) => {
    console.log(userID);
    axios
        .get(API.API_URL + '/users/' + userID, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
            },
        })
        .then(response => onSuccess(response.data.data))
        .catch(error => {
            if (error.response.status === 401) {
                authUtils.logOutHandle();
            } else if (error.response.status === 403) {
                return (window.location.href = 'http://localhost:3000/error/403');
            } else {
                onError(error.response.data.message);
            }
            console.log(error.response.status);
        });
};
const userGetUtils = {
    getAllUsers,
    getUserByID,
};

export default userGetUtils;
