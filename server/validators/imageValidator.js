const { body } = require("express-validator");

const imageValidator = [
    body('eventId', 'Event ID is required').not().isEmpty(),
    body('eventId', 'Event ID must be an integer').isInt()
];

module.exports = {
    imageValidator
};