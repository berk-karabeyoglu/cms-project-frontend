import axios from "axios";
import { API } from "../constants/constants";

const deleteField = (contentTypeID, fieldID,onSuccess,onError) => {
    axios
      .delete(
        API.API_URL + '/content-types/' + contentTypeID + '/fields/' + fieldID,
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
        // console.log(error.response)
      });
  };
  const commonUtils = {
    deleteField,
  };
  
  export default commonUtils;