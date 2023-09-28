const { check } = require('express-validator');
const { checkValidationResult } = require('./validation.middleware')

const validateFirstName = check('first_name')
  .trim()
  .notEmpty().withMessage('First name is required');

const validateLastName = check('last_name')
  .trim()
  .notEmpty().withMessage('Last name is required');

const validateEmail = check('email')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid email format');

const validatePassword = check('password')
  .trim()
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Password must contain at least one uppercase letter and one number');

  const validateNewPassword = check('new_password')
  .trim()
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Password must contain at least one uppercase letter and one number')
  .optional();

const validateRegistration = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateNewPassword,
  checkValidationResult
];

module.exports = {
  validateEmail,
  validateFirstName,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateNewPassword,
  validateRegistration,
}