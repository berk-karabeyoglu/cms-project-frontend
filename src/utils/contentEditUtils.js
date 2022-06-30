import axios from 'axios';
import { API } from '../constants/constants';

const getSingleContent = (contentTypeID, contentID, onSucces) => {
  axios
    .get(
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
    .then(response => onSucces(response.data.data))
    .catch(error => error.response);
};

const updateContent = (values, contentTypeID, contentID, onSuccess) => {
  console.log('GELEn VALUES', values);
  axios
    .put(
      API.API_URL +
        '/content-types/' +
        contentTypeID +
        '/contents/' +
        contentID,
      values,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => error.response);
};
const editContentUtils = {
  getSingleContent,
  updateContent,
};

export default editContentUtils;
