import axios from 'axios';
import { API } from '../constants/constants';

const addContent = (values, contentTypeID, onSuccess, onError) => {
  console.log(values)
  axios
    .post(
      API.API_URL + '/content-types/' + contentTypeID + '/contents',
      values,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
          'Content-Type': 'multipart/form-data',
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
