import { TIMESTAMP_VALUES } from '../../../constants/constants';

const validateFieldName = name => {
  const errors = {};
  if (!name) {
    errors.name = 'Field name is required';
  }
  return errors.name;
};

const formatFieldColumName = column_name => {
  column_name = column_name.trim();
  column_name = column_name.replace(/ /g, '_');
  column_name = column_name.toLowerCase();
  return column_name;
};

// const checkDateFormat = timestampFormat => {
//   let flag = false;
//   const errors = {};
//   Object.keys(TIMESTAMP_VALUES).map(_key => {
//     timestampFormat === _key ? (flag = true) : (flag = false);
//   });

//   return flag === false
//     ? errors.timestampFormat('Your format must be one the options')
//     : '';
// };

const timestampFieldValidations = {
  validateFieldName,
  formatFieldColumName,
};

export default timestampFieldValidations;
