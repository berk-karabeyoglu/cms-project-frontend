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
        '/versions?only=' +
        only,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data))
    .catch(error => console.log(error.response.message));
};

const changeVersions = (
  contentTypeID,
  contentID,
  versionID,
  onSuccess,
  onError
) => {
  console.log(contentTypeID, contentID, versionID);
  axios
    .put(
      API.API_URL +
        '/content-types/' +
        contentTypeID +
        '/contents/' +
        contentID +
        '/versions/' +
        versionID,
      {
        contentTypeID,
        contentID,
        versionID
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data.message))
    .catch(error => onError(error.response.message));
};
const versionsUtils = {
  getAllVersionsOfContent,
  changeVersions,
};

export default versionsUtils;
