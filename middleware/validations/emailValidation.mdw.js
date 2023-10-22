const { check } = require("express-validator");
const { checkValidationResult } = require("./validation.middleware");
const { validateEmail } = require("./registrationValidation.mdw");
const { validateReason } = require("./queryValidation.mdw");
const { validateDescription } = require("./courseValidation.mdw");

const validateFrom = check('from')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid email format');


const validateMailer = [
  validateFrom,
  validateEmail,
  validateReason,
  validateDescription,
  checkValidationResult
]


  module.exports = {
    validateMailer
  }