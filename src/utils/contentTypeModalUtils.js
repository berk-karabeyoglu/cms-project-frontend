import pluralize from 'pluralize';
import axios from 'axios';
import { API } from '../constants/constants';

const setModalName = name => {
  capitalizeWords(name);
  name = name.replace(/\s/g, ''); // Bunun ile aradaki, bas ve sondaki butun boslukları siliyoruz
  name = pluralize.singular(name);
  return name;
};

const capitalizeWords = nameField => {
  let arr = nameField.split(' ');
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });
};

const searchContentType = (search, onSuccess, onError) => {
  axios
    .get(
      API.API_URL + '/content-types',
      {
        search,
      },
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
    });
};

const createContentType = (
  name,
  description,
  modelName,
  onSuccess,
  onError
) => {
  axios
    .post(
      API.API_URL + '/content-types',
      {
        name,
        description,
        modelName,
      },
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
    });
};

const modalUtils = {
  setModalName,
  createContentType,
  searchContentType,
};

export default modalUtils;
