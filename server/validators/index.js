const { param } = require("express-validator");

const idParamValidator = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id should be numeric").isNumeric(),
];

// Assuming multer middleware is applied before validators
const imageUploadValidator = (req, res, next) => {
  if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(req.file.mimetype)) {
          return res.status(422).json({ errors: [{ msg: 'Invalid file type. Only JPG, PNG, and GIF are allowed.' }] });
      }
      // Additional file validation logic can be implemented here
  }
  next(); // Proceed to next middleware or route handler
};

module.exports = {
  idParamValidator,
  imageUploadValidator
};