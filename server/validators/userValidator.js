const { body, param } = require("express-validator");

const userValidator = [
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body(
      "password",
      "The minimum password length is 6 characters, max 50"
    ).isLength({ min: 6, max: 50 }),
    body("image", "image is required").not().isEmpty(),
];

const updateUserValidator = [
    param("id", "a user id is required").not().isEmpty(),
    param("id", "user id has to be an integer").isNumeric(),
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body(
      "password",
      "The minimum password length is 6 characters, max 50"
    ).isLength({ min: 6, max: 50 }),
    body("image", "image is required").not().isEmpty(),
];

module.exports = {
    userValidator,
    updateUserValidator
};