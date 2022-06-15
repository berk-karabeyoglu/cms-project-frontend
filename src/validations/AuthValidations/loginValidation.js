import { PASSWORD_VALIDATION_CRITERIAS } from '../../constants/constants';

const validateEmail = email => {
  let errors = {};
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  return errors.email;
};

const validatePassword = password => {
  let errors = {};
  if (!password) {
    errors.password = 'Password is required';
  }
  return errors.password;
};

const arePasswordsSame = (password1, password2) => {
  let errors = {}
  if (password1 !== password2) {
    errors.password_confirmation = 'Passwords must match!';
  }
  return errors.password_confirmation;
};

const strengthPasswordChecker = password => {
  let errors = [];
  // Min 8 char
  if (password.length < 8) {
    errors.push(PASSWORD_VALIDATION_CRITERIAS.minchar);
  }

  // At least 1 uppercase
  let regexPattern = new RegExp('(?=.*?[A-Z])');
  if (!regexPattern.test(password)) {
    errors.push(PASSWORD_VALIDATION_CRITERIAS.uppercase);
  }

  // At least 1 lowercase
  regexPattern = new RegExp('(?=.*?[a-z])');
  if (!regexPattern.test(password)) {
    errors.push(PASSWORD_VALIDATION_CRITERIAS.lowercase);
  }
  // At least 1 special char
  regexPattern = new RegExp('(?=.*?[#?!@$%^&*-])');
  if (!regexPattern.test(password)) {
    errors.push(PASSWORD_VALIDATION_CRITERIAS.specialChar);
  }
  // At least 1 digit
  regexPattern = new RegExp('(?=.*?[0-9])');
  if (!regexPattern.test(password)) {
    errors.push(PASSWORD_VALIDATION_CRITERIAS.digit);
  }
  return errors;
};

const validations = {
  validateEmail,
  validatePassword,
  arePasswordsSame,
  strengthPasswordChecker,
};

export default validations;
