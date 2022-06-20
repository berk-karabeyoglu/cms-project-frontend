import axios from 'axios';
import { API } from '../../constants/constants';

const getContentId = () => {
  const splittedArray = window.location.pathname.split('/');
  const contentID = splittedArray[splittedArray.length - 1];
  return contentID;
};

const post = (
  type,
  label,
  description,
  required,
  columnName,
  mimeTypes,
  fileAmount,
  fileSize,
  onSuccess,
  onError
) => {
  const contentID = getContentId();
  if (required === true) {
    required = 1;
  } else {
    required = 0;
  }
  axios
    .post(
      API.API_URL + '/content-types/' + contentID + '/fields',
      {
        type,
        label,
        description,
        required,
        columnName,
        mimeTypes,
        fileAmount,
        fileSize,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => {
      console.log(response);
      onSuccess(response.data.message);
    })
    .catch(error => {
      console.log(error.response);
      onError(error.response.data.message);
    });
};

const stringFieldsUtils = {
  post,
};

export default stringFieldsUtils;
