const { body } = require("express-validator");

const likeValidator = [
    body('eventId', 'Event ID is required').not().isEmpty(),
    body('eventId', 'Event ID must be an integer').isInt(),
    body('userId', 'User ID is required').not().isEmpty(),
    body('userId', 'User ID must be an integer').isInt(),
];

module.exports = {
    likeValidator
};
