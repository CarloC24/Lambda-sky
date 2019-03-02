const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.photo = !isEmpty(data.photo) ? data.photo : '';
  data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : '';
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';

  if (!isEmpty(data.photo)) {
  if (!Validator.isURL(data.photo)) {
      errors.photo = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.dateofbirth)) {
    if (!Validator.isISO8601(data.dateofbirth)) {
      errors.dateofbirth = 'Not a valid date';
    }
  }

  if (!isEmpty(data.phonenumber)) {
    if (!Validator.isMobilePhone(data.phonenumber)) {
      errors.phonenumber = 'Not a valid phone number';
    }
  }

  if(Validator.isEmpty(data.airport)) {
    errors.airport = 'Airport field is required.';
  }

  if(Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = 'Phone number field is required.';
  }

  // Possible adds: validate photo extension, validate 18+, validate isEmpty for airport (and anything else) if required

  return {
    errors, 
    isValid: isEmpty(errors)
  }
} 