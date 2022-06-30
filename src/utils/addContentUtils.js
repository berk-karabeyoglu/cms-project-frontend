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
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => onError(error));
};

const deleteContent = (contentTypeID, contentID, onSuccess, onError) => {
  axios
    .delete(
      API.API_URL +
        '/content-types/' +
        contentTypeID +
        '/contents/' +
        contentID,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => {
      onSuccess(response.data.message);
    })
    .catch(error => {
      onError(error.response.data.message);
      // console.log(error.response)
    });
};

const validateTagsInputWithRegex = tags => {
  const errors = {};
  if (!/^[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*$/gm.test(tags) && tags !== '') {
    errors.tags = 'You have to use only alphanumeric characters and comma';
  }
  return errors.tags;
};

const addContentUtils = {
  addContent,
  deleteContent,
  validateTagsInputWithRegex,
};

export default addContentUtils;
