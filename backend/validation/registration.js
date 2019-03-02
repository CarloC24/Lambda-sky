const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password = 'Password must be at least 6 characters.';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}