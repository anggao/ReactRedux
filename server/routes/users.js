import express from 'express'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

let router = express.Router()

function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.username)) {
    errors.username = 'This filed is required'
  }
  if (Validator.isNull(data.email)) {
    errors.email = 'This filed is required'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isNull(data.password)) {
    errors.password = 'This filed is required'
  }
  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This filed is required'
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match'
  }
  if (Validator.isNull(data.timezone)) {
    errors.timezone = 'This filed is required'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
})

export default router;
