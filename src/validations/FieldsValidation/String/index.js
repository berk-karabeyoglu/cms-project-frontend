const validateFieldName = name => {
  const errors = {};
  if (!name) {
    errors.name = 'Field name is required';
  }
  return errors.name;
};

const validateFieldLength = length => {
  const errors = {};
  if (length < 3) {
    errors.length = "Length cannot be lower than 3.";
  }else if (length > 255) {
    errors.length = 'Length cannot be greater than 255.';
  }else if(!(/^[0-9]*$/i.test(length))){
    errors.length = "You can write only numeric characters";
  }
  return errors.length;
};

const formatFieldColumName = column_name => {
  column_name = column_name.trim();
  column_name = column_name.replace(/ /g, '_');
  column_name = column_name.toLowerCase();
  return column_name;
};

const stringFieldValidations = {
  validateFieldName,
  validateFieldLength,
  formatFieldColumName,
};

export default stringFieldValidations;
