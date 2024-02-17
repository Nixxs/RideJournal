const { body, param } = require('express-validator');
const User = require('../models/user'); 


const userValidator = [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body(
      "password",
      "The minimum password length is 6 characters, max 120"
    ).isLength({ min: 6, max: 120 }),
    body("profile").optional().isLength({ min: 0 }),
];

// Adjustments for partial updates where not all fields are required
const updateUserValidator = [
    param("id", "User ID is required").not().isEmpty(),
    param("id", "User ID has to be an integer").isNumeric(),
    body("name").optional().not().isEmpty(),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password").optional().isLength({ min: 6, max: 120 }).withMessage("The minimum password length is 6 characters, max 120"),
    body("profile").optional().isLength({ min: 0 }),
];

const uniqueEmailValidator = body('email').optional().custom(async (email) => {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    return true; // Validation succeeded
});

const userLoginValidator = [
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
    max: 120,
  }),
];

module.exports = {
    userValidator,
    updateUserValidator,
    uniqueEmailValidator,
    userLoginValidator
};
