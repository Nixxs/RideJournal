const { body, param, custom } = require("express-validator");

const userValidator = [
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body(
      "password",
      "The minimum password length is 6 characters, max 50"
    ).isLength({ min: 6, max: 50 }),
    body("profile").optional().isLength({ min: 0 }),
    // Add custom validation for image
    custom((value, { req }) => {
        if (req.file) { // Only validate if file is present
            // Example validation: Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.');
            }
            // Additional validations like file size can be added here
        }
        // If there's no file, or the file is valid, just return true
        return true;
    })
];

const updateUserValidator = [
    param("id", "a user id is required").not().isEmpty(),
    param("id", "user id has to be an integer").isNumeric(),
    // Include the same validation chain for update
    ...userValidator.slice(2) // This skips the first two validators specific to creating a user
];

module.exports = {
    userValidator,
    updateUserValidator
};
