const ExpressValidator = require('express-validator');
const { check } = require('express-validator');


function checkValidationResult(req, res, next) {
  const result = ExpressValidator.validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: result.array() });
};

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


const validateRegistration = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  checkValidationResult
];

module.exports = {
  validateRegistration,
}