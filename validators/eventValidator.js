const { body, param } = require("express-validator");

const eventValidator = [
    body("userId", "a user id is required").not().isEmpty(),
    body("userId", "user id has to be an integer").isNumeric(),
    body("vehicleId", "a vehicle id is required").not().isEmpty(),
    body("vehicleId", "vehicle id has to be an integer").isNumeric(),
    body("title", "a title is required").not().isEmpty(),
    body("detail").optional().isLength({ min: 0 }),
    body("type", "a event type is required").not().isEmpty(),
    body("type", "Invalid event type").matches(/^(repair|modification|story|maintenance)$/),
    body("date", "a valid date is required").not().isEmpty(),
    body("date", "invalid date format").isISO8601(),
    body("odometer", "odometer must be a number").isNumeric(),
    body("published", "published must be a boolean").isBoolean(),
];

const updateEventValidator = [
    param("id", "a vehicle id is required").not().isEmpty(),
    param("id", "vehicle id has to be an integer").isNumeric(),
    body("userId", "a user id is required").optional().not().isEmpty(),
    body("userId", "user id has to be an integer").optional().isNumeric(),
    body("vehicleId", "a vehicle id is required").optional().not().isEmpty(),
    body("vehicleId", "vehicle id has to be an integer").optional().isNumeric(),
    body("title", "a title is required").optional().not().isEmpty(),
    body("detail").optional().isLength({ min: 0 }),
    body("type", "a event type is required").optional().not().isEmpty(),
    body("type", "Invalid event type").optional().matches(/^(repair|modification|story|maintenance)$/),
    body("date", "a valid date is required").optional().not().isEmpty(),
    body("date", "invalid date format").optional().isISO8601(),
    body("odometer", "odometer must be a number").optional().isNumeric(),
    body("published", "published must be a boolean").optional().isBoolean(),
];

const eventTypeParamValidator = [
    param("type", "a event type is required").not().isEmpty(),
    param("type", "Invalid event type").matches(/^(repair|modification|story|maintenance)$/),
];

module.exports = {
    eventValidator,
    updateEventValidator,
    eventTypeParamValidator
};