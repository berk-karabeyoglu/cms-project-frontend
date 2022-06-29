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
      onSuccess(response.data.message);
    })
    .catch(error => {
      onError(error.response.data.message);
    });
};

const update = (
  type,
  label,
  description,
  is_required,
  mimeTypes,
  fileAmount,
  fileSize,
  contentTypeID,
  fieldID,
  onSuccess,
  onError
) => {
  const contentID = getContentId();
  if (is_required === true) {
    is_required = 1;
  } else {
    is_required = 0;
  }
  axios
    .put(
      API.API_URL + '/content-types/' + contentTypeID + '/fields/' + fieldID,
      {
        type,
        label,
        description,
        is_required,
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
      onSuccess(response.data.message);
    })
    .catch(error => {
      onError(error.response.data.message);
    });
};

const stringFieldsUtils = {
  post,
  update,
};

export default stringFieldsUtils;
