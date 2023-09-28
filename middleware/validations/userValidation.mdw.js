const { checkValidationResult } = require('./validation.middleware');
const { check } = require('express-validator');
const { validateFirstName, validateLastName, validateEmail, validatePassword, validateNewPassword } = require('./registrationValidation.mdw')

const validateRole = check('role')
.trim()
.notEmpty().withMessage('Role is required')
.isIn(['admin', 'user']).withMessage('Invalid role')
.optional();

const validateSubscription = check('subscribed')
  .isBoolean().withMessage('Subscribed must be a boolean')
  .optional();


const validateUpdate = [
  validateFirstName.optional(),
  validateLastName.optional(),
  validateEmail.optional(),
  validatePassword.optional(),
  validateNewPassword.optional(),
  validateRole,
  validateSubscription,
  checkValidationResult
];

module.exports = {
  validateUpdate
};
