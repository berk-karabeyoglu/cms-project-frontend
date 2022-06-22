import axios from 'axios';
import {API} from '../constants/constants';

const addContent = (contentTypeID, onSuccess, onError) => {
  axios
    .post(API.API_URL + '/content-types/' + contentTypeID + '/contents', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data.message))
    .catch(error => onError(error.response));
};

const addContentUtils = {
  addContent,
};

export default addContentUtils;
