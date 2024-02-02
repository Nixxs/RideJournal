const { body, param } = require("express-validator");

const commentValidator = [
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId has to be an integer").isNumeric(),
    body("eventId", "eventId is required").not().isEmpty(),
    body("eventId", "eventId has to be an integer").isNumeric(),
];

const updateCommentValidator = [
    param("id", "a user id is required").not().isEmpty(),
    param("id", "user id has to be an integer").isNumeric(),
    body("userId", "userId is required").optional().not().isEmpty(),
    body("userId", "userId has to be an integer").optional().isNumeric(),
    body("eventId", "eventId is required").optional().not().isEmpty(),
    body("eventId", "eventId has to be an integer").optional().isNumeric(),
];

module.exports = {
    commentValidator,
    updateCommentValidator
};