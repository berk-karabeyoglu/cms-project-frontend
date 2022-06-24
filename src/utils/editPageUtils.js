import axios from 'axios';
import { API } from '../constants/constants';

const getAllContentTypes = (onSuccess, onError) => {
  axios
    .get(API.API_URL + '/content-types', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data.data))
    .catch(error => onError(error.response.data));
};

const getContentType = (onSuccess, onError) => {
  const splittedArray = window.location.pathname.split('/');
  const contentID = splittedArray[splittedArray.length - 1];
  axios
    .get(
      API.API_URL + '/content-types/' + contentID,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      },
      []
    )
    .then(response => {
      onSuccess(response.data.data);
    })
    .catch(error => {
      onError(error);
    });
};

const deleteContentType = (onSuccess, onError) => {
  const splittedArray = window.location.pathname.split('/');
  const contentID = splittedArray[splittedArray.length - 1];
  axios
    .delete(
      API.API_URL + '/content-types/' + contentID,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      },
      []
    )
    .then(response => {
      onSuccess(response.data.message);
    })
    .catch(error => {
      onError(error.response.data.message);
    });
};

const fillContentTypeFields = onSuccess => {
  const splittedArray = window.location.pathname.split('/');
  const contentID = splittedArray[splittedArray.length - 1];
  axios
    .get(API.API_URL + '/content-types/' + contentID + '/fields', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => {
      onSuccess(response.data.data);
    });
};

const addFieldToContentType = () => {};

const getSelectedFieldTypeComponent = () => {};

const editPageUtils = {
  getAllContentTypes,
  getContentType,
  deleteContentType,
  addFieldToContentType,
  fillContentTypeFields,
  getSelectedFieldTypeComponent,
};
export default editPageUtils;
