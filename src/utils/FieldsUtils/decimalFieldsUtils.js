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
  digits,
  decimal,
  separator,
  minimum,
  maximum,
  prefix,
  suffix,
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
        digits,
        decimal,
        separator,
        minimum,
        maximum,
        prefix,
        suffix,
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
  separator,
  min,
  max,
  prefix,
  suffix,
  contentTypeID,
  fieldID,
  onSuccess,
  onError
) => {
  console.log("Minimum:", min)
  console.log("Maximum:", max)
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
        separator,
        min,
        max,
        prefix,
        suffix,
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
  update
};

export default stringFieldsUtils;
