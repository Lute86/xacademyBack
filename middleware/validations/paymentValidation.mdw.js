const { check } = require('express-validator');
const { checkValidationResult } = require('./validation.middleware')
const { validateName } = require('./queryValidation.mdw')

const validateCardNumber = check('cardNumber')
  .trim()
  .notEmpty().withMessage('Card number is required')
  .matches(/^[0-9]{16}$/).withMessage('Card number must be 16 digits');

const validateExpiry = check('expiryDate')
  .trim()
  .notEmpty().withMessage('Expiry date is required')
  .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/).withMessage('Invalid expiry date format');

const validateCvv = check('cardCvv')
  .trim()
  .notEmpty().withMessage('CVV is required')
  .matches(/^[0-9]{3}$/).withMessage('CVV must be 3 digits');

const validatePayment = [
  validateName,
  validateCardNumber,
  validateExpiry,
  validateCvv,
  checkValidationResult
];


module.exports = {
  validateCardNumber,
  validateExpiry,
  validateCvv,
  validatePayment
}
