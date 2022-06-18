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
  column_name,
  length,
  is_required,
  onSuccess,
  onError
) => {
  const contentID = getContentId();
  console.log("type: " + type);
  console.log("label: " + label);
  console.log("description: " + description);
  console.log("column_name: " + column_name);
  console.log("length: " + length);
  console.log("isRequire: " + is_required);
  
  // axios
  //   .post(
  //     API.API_URL + '/content-types/' + contentID + '/fields',
  //     {
  //       type,
  //       label,
  //       description,
  //       is_required,
  //       column_name,
  //       length,
  //     },
  //     {
  //       headers: {
  //         Authorization:
  //           'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
  //       },
  //     }
  //   )
  //   .then(response => {
  //     console.log(response);
  //     onSuccess(response.data.message)
  //   })
  //   .catch(error => {
  //     console.log(error.response);
  //     onError(error.response.data.message);
  //   });
};

const stringFieldsUtils = {
  post
}

export default stringFieldsUtils;