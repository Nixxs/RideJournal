const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator } = require("../validators");
const {vehicleValidator, updateVehicleValidator, vehicleTypeParamValidator} = require("../validators/vehicleValidator");

/**
 * @swagger
 * /api/vehicles:
 *  get:
 *    description: Use to request all vehicles
 *    tags:
 *      - Vehicles
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
    try {
        const data = await vehicleController.getVehicles();
        res.send(data);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *  get:
 *    description: Use to request a vehicle by ID
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of vehicles to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Vehicle not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await vehicleController.getVehicle(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles/user/{id}:
 *  get:
 *    description: Use to request a vehicle by user ID
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch vehicles
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Vehicle not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/user/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await vehicleController.getVehiclesByUser(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles/type/{type}:
 *  get:
 *    description: Use to request vehicles by type
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - name: type
 *        in: path
 *        description: type of vehicle
 *        required: true
 *        type: string
 *        example: car
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Vehicles not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/type/:type", vehicleTypeParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await vehicleController.getVehiclesByType(req.params.type);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles:
 *  post:
 *    description: Use to create a new vehicle
 *    tags:
 *      - Vehicles
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - type
 *              - make
 *              - model
 *              - year
 *              - image
 *            properties:
 *              userId:
 *                type: integer
 *                example: 2
 *              name:
 *                type: string
 *                example: My Vehicle
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [car, motorcycle, boat, bicycle]
 *                example: car
 *              make:
 *                type: string
 *                example: Toyota
 *              model:
 *                type: string
 *                example: Corolla
 *              year:
 *                type: integer
 *                example: 2020
 *              image:
 *                type: string
 *                example: mycar.jpg
 *              profile:
 *                type: string
 *                example: This is my favorite car.
 *                nullable: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", vehicleValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await vehicleController.createVehicle(req.body);
            if (!data){
                res.sendStatus(404);
            } else {
                res.send({result:200, data:data});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *  put:
 *    description: Use to update an existing vehicle
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of vehicle to update
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - type
 *              - make
 *              - model
 *              - year
 *              - image
 *            properties:
 *              userId:
 *                type: integer
 *                example: 2
 *              name:
 *                type: string
 *                example: My Vehicle
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [car, motorcycle, boat, bicycle]
 *                example: car
 *              make:
 *                type: string
 *                example: Toyota
 *              model:
 *                type: string
 *                example: Corolla
 *              year:
 *                type: integer
 *                example: 2020
 *              image:
 *                type: string
 *                example: mycar.jpg
 *              profile:
 *                type: string
 *                example: This is my favorite car.
 *                nullable: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", updateVehicleValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await vehicleController.updateVehicle(req.params.id, req.body);
            if (!data){
                // if there is no data returned then its a 404 not found
                res.sendStatus(404);
            } else {
                // all good
                res.send({result:200, data: data});
            }
        } else {
            // there are errors in the request
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *  delete:
 *    description: Use to delete a vehicle by ID
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of vehicle to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: vehicle not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await vehicleController.deleteVehicle(req.params.id);
            if (!data){
                res.sendStatus(404);
            } else {
                res.send({result: 200, data: data});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;