const { body } = require("express-validator");

const imageValidator = [
    body('eventId', 'Event ID is required').not().isEmpty(),
    body('eventId', 'Event ID must be an integer').isInt(),
    body('url', 'Image URL is required').not().isEmpty(),
    body('url', 'Invalid URL format for image').isURL()
];

module.exports = {
    imageValidator
};