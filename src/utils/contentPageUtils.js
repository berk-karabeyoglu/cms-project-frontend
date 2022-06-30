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

const fillContentsTable = (search, tags, selectedContentTypeID, onSuccess) => {
  console.log("Api istegine gelenler:");
  console.log("SEARCH:",search)
  console.log("TAGS",tags)
  console.log("CONTENT TYPE ID :" , selectedContentTypeID)
  // Both of them are filled
  if (tags !== '' && search !== '') {
    axios
      .get(
        API.API_URL +
          '/content-types/' +
          selectedContentTypeID +
          '/contents?search=' +
          search +
          '&tags=' +
          tags,
        {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('access_token')).token,
          },
        }
      )
      .then(response => onSuccess(response.data.data))
      .catch(error => console.log(error.response.data));
  } // tags filled search empty
  else if (tags !== '' && search === '') {
    axios
      .get(
        API.API_URL +
          '/content-types/' +
          selectedContentTypeID +
          '/contents?tags=' +
          tags,
        {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('access_token')).token,
          },
        }
      )
      .then(response => onSuccess(response.data.data))
      .catch(error => console.log(error.response.data));
  } // search filled tags empty
  else if (tags === '' && search !== '') {
    axios
      .get(
        API.API_URL +
          '/content-types/' +
          selectedContentTypeID +
          '/contents?search=' +
          search,
        {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('access_token')).token,
          },
        }
      )
      .then(response => onSuccess(response.data.data))
      .catch(error => console.log(error.response.data));
  } else {
    axios
      .get(
        API.API_URL +
          '/content-types/' +
          selectedContentTypeID +
          '/contents' +
          search,
        {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('access_token')).token,
          },
        }
      )
      .then(response => onSuccess(response.data.data))
      .catch(error => console.log(error.response.data));
  }
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
  getContentTypeFields,
};

export default contentPageUtils;
