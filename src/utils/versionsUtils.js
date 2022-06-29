import axios from 'axios';
import { API } from '../constants/constants';

const getAllVersionsOfContent = async (contentTypeID, contentID, onSuccess) => {
  const only = 'version,title';
  await axios
    .get(
      API.API_URL +
        '/content-types/' +
        contentTypeID +
        '/contents/' +
        contentID +
        '/versions',
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      },
      {
        only,
      }
    )
    .then(response => onSuccess(response.data))
    .catch(error => console.log(error.response.message));
};

const versionsUtils = {
  getAllVersionsOfContent,
};

export default versionsUtils;
