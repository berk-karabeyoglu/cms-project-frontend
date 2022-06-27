import axios from 'axios';
import { API } from '../constants/constants';
import editPageUtils from './editPageUtils';

const fillContentTypesDropdown = async onSuccess => {
  const contentTypes = [];
  await editPageUtils.getAllContentTypes(
    onSuccesResult => {
      onSuccesResult.map(test => {
        let object = {
          id: test.id,
          name: test.name,
        };
        contentTypes.push(object);
      });
      onSuccess(contentTypes);
    },
    onErrorResult => {
      console.log(onErrorResult);
    }
  );
};

const fillContentsTable = async (selectedContentTypeID, onSuccess) => {
  axios
    .get(
      API.API_URL + '/content-types/' + selectedContentTypeID + '/contents',
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      }
    )
    .then(response => onSuccess(response.data))
    .catch(error => console.log(error.response.data));
};

const getContentTypeFields = (contentTypeID, onSuccess) => {
  axios
    .get(API.API_URL + '/content-types/' + contentTypeID + '/fields', {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
      },
    })
    .then(response => onSuccess(response.data))
    .catch(error => console.log(error.response.data));
};
const contentPageUtils = {
  fillContentTypesDropdown,
  fillContentsTable,
  getContentTypeFields
};

export default contentPageUtils;
