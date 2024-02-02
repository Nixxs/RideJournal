const { body, param } = require("express-validator");

const vehicleValidator = [
    body("userId", "User ID is required").not().isEmpty(),
    body("userId", "User ID has to be an integer").isNumeric(),
    body("type", "Vehicle type is required").not().isEmpty(),
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
    body("profile").optional().isLength({ min: 0 }),
];

// Adjustments for partial updates where not all fields are required
const updateVehicleValidator = [
    param("id", "Vehicle ID is required").not().isEmpty(),
    param("id", "Vehicle ID has to be an integer").isNumeric(),
    body("userId").optional().isNumeric().withMessage("User ID has to be an integer"),
    body("type").optional().matches(/^(car|motorcycle|boat|bicycle)$/).withMessage("Invalid vehicle type"),
    body("make").optional().not().isEmpty(),
    body("model").optional().not().isEmpty(),
    body("year").optional().isInt().withMessage("Year must be an integer")
        .custom((value) => {
            const currentYear = new Date().getFullYear();
            if (value < 1900 || value > currentYear) {
                throw new Error("Year must be between 1900 and the current year");
            }
            return true;
        }),
    body("profile").optional().isLength({ min: 0 }),
];

const vehicleTypeParamValidator = [
    param("type", "Vehicle type is required").not().isEmpty(),
    param("type", "Invalid vehicle type").matches(/^(car|motorcycle|boat|bicycle)$/),
];

module.exports = {
    vehicleValidator,
    updateVehicleValidator,
    vehicleTypeParamValidator,
};
