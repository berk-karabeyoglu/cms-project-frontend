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


const validateMinimum = minimum => {
    const errors = {};
    if (minimum !== undefined && !/^[0-9]*$/i.test(minimum)) {
      errors.minimum = 'You can write only numeric characters';
    }
    return errors.minimum;
  };
  
  const validateMaximum = maximum => {
    const errors = {};
    if (maximum !== undefined && !/^[0-9]*$/i.test(maximum)) {
      errors.maximum = 'You can write only numeric characters';
    }
    return errors.maximum;
  };

const doubleFieldValidations = {
  validateFieldName,
  formatFieldColumName,
  validateMinimum,
  validateMaximum
};

export default doubleFieldValidations;
