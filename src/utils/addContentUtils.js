import axios from 'axios';
import { API } from '../constants/constants';

const addContent = (values, contentTypeID, onSuccess, onError) => {
  var formData = new FormData();
  Object.keys(values).forEach(key => {
    formData.append(key, values[key]);
    console.log('form key: ' + key);
    console.log('form value: ' + values[key]);
  });

  axios
    .post(
      API.API_URL + '/content-types/' + contentTypeID + '/contents',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => console.log(error));
};

const addContentUtils = {
  addContent,
};

export default addContentUtils;
