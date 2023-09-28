const { checkValidationResult } = require('./validation.middleware');
const { check } = require('express-validator');
const { validateFirstName, validateLastName} = require('./registrationValidation.mdw')


const validateTeacher = [
  validateFirstName,
  validateLastName,
  checkValidationResult
];
const validateTeacherUpdate = [
  validateFirstName.optional(),
  validateLastName.optional(),
  checkValidationResult
];

module.exports = {
  validateTeacher,
  validateTeacherUpdate
};
