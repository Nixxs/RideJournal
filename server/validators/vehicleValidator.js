const { body, param } = require("express-validator");

const vehicleValidator = [
    body("userId", "a user id is required").not().isEmpty(),
    body("userId", "user id has to be an integer").isNumeric(),
    body("type", "a vehicle type is required").not().isEmpty(),
    body("type", "Invalid vehicle type").matches(/^(car|motorcycle|boat|bicycle)$/),
    body("make", "Make is required").not().isEmpty(),
    body("model", "Model is required").not().isEmpty(),
    body("year", "Year is required").not().isEmpty(),
    body("year", "Year must be an integer").isInt(),
    body("year", "Year must be between 1900 and the current year").custom((value) => {
        const currentYear = new Date().getFullYear();
        if (value < 1900 || value > currentYear) {
            throw new Error("Year must be between 1900 and the current year");
        }
        return true;
    }),
    body("image", "Image name is required").not().isEmpty(),
    body("profile").optional().isLength({ min: 0 }),
];

const updateVehicleValidator = [
    param("id", "a user id is required").not().isEmpty(),
    param("id", "user id has to be an integer").isNumeric(),
    body("userId", "a user id is required").not().isEmpty(),
    body("userId", "user id has to be an integer").isNumeric(),
    body("type", "a vehicle type is required").not().isEmpty(),
    body("type", "Invalid vehicle type").matches(/^(car|motorcycle|boat|bicycle)$/),
    body("make", "Make is required").not().isEmpty(),
    body("model", "Model is required").not().isEmpty(),
    body("year", "Year is required").not().isEmpty(),
    body("year", "Year must be an integer").isInt(),
    body("year", "Year must be between 1900 and the current year").custom((value) => {
        const currentYear = new Date().getFullYear();
        if (value < 1900 || value > currentYear) {
            throw new Error("Year must be between 1900 and the current year");
        }
        return true;
    }),
    body("image", "Image name is required").not().isEmpty(),
    body("profile").optional().isLength({ min: 0 }),
];

const vehicleTypeParamValidator = [
    param("type", "a vehicle type is required").not().isEmpty(),
    param("type", "Invalid vehicle type").matches(/^(car|motorcycle|boat|bicycle)$/),
];

module.exports = {
    vehicleValidator,
    updateVehicleValidator,
    vehicleTypeParamValidator
};