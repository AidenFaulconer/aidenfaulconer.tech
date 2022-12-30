const { check, validationResult } = require('express-validator')

const createCustomValidator = (validatorFn) => (field) =>
  check(field).custom(validatorFn)


const sanitizationOptions = {
  email: check('email').isEmail().normalizeEmail(),
  password: check('password').isLength({ min: 6 }).trim().escape(),
  username: check('username').isLength({ min: 3, max: 50 }).trim().escape(),
  fullName: check('fullName').isLength({ min: 3, max: 50 }).trim().escape(),
  age: check('age').isInt().toInt(),
  link: check('link').isURL(),
  phone: check('phone').isMobilePhone(),
  street: check('street').trim().escape(),
  city: check('city').isLength({ min: 2, max: 50 }).trim().escape(),
  state: check('state').isLength({ min: 2, max: 50 }).trim().escape(),
  country: check('country').isLength({ min: 2, max: 50 }).trim().escape(),
  zip: check('zip').isPostalCode().toInt(),
};

//checks every request, has added overhead, should only be used for speed development then be segmented on a case by case basis
const validateAllMiddleware = (req, res, next) => {
  const checks = Object.keys(sanitizationOptions)
    .filter((key) => req.body[key] || req.query[key])
    .map((key) => sanitizationOptions[key]);

  check(checks).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
}

//basic validation
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}

module.exports = {
  createCustomValidator,
  sanitizationOptions,
  validationMiddleware,
  validateAllMiddleware,
};
