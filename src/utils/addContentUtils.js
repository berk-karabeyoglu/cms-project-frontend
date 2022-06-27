import axios from 'axios';
import { API } from '../constants/constants';

const addContent = (values, contentTypeID, onSuccess, onError) => {
  axios
    .post(
      API.API_URL + '/content-types/' + contentTypeID + '/contents',
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => onError(error.response.data.message));
};

const addContentUtils = {
  addContent,
};

export default addContentUtils;
