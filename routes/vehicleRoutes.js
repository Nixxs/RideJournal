const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// import multer for image file hanlding
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator, imageUploadValidator } = require("../validators");
const {vehicleValidator, updateVehicleValidator, vehicleTypeParamValidator} = require("../validators/vehicleValidator");
const verifyToken = require("../auth/authMiddleware");

/**
 * @swagger
 * /api/vehicles:
 *  get:
 *    description: Use to request all vehicles
 *    tags:
 *      - Vehicles
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Limit the number of events returned. Default is 10.
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          default: 0
 *        description: Number of events to skip for pagination. Default is 0.
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
        const limit = parseInt(req.query.limit, 10) || 10; // Default limit is 10
        const offset = parseInt(req.query.offset, 10) || 0; // Default offset is 0

        const data = await vehicleController.getVehicles({limit, offset});
        res.send({result:200, data: data});
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
 * /api/vehicles/{id}/include:
 *  get:
 *    description: Use to request a vehicle by ID with all includes
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
router.get("/:id/include", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await vehicleController.getVehicleIncludeAll(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                const filteredData = data.toJSON();
                if (filteredData.User){
                    delete filteredData.User.password;
                    delete filteredData.User.email;
                }
                res.send({ result: 200, data: filteredData });
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
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - type
 *              - make
 *              - model
 *              - year
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
 *              location:
 *                type: string
 *                example: Australia.
 *                nullable: true
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
 *                format: binary
 *                description: Optional image file
 *                nullable: true
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
router.post("/", upload.single('image'), verifyToken, imageUploadValidator, vehicleValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let vehicleData = req.body;
            if (req.file){
                vehicleData.image = req.file;
            }
            const data = await vehicleController.createVehicle(vehicleData, req.userId);
            switch (data) {
                case 404:
                    res.sendStatus(404);
                    break;
                case 401:
                    res.status(401).json({errors: [{"msg":"Unauthorized"}]});
                    break;
                default:
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
 *        multipart/form-data:
 *          schema:
 *            type: object
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
  *              location:
 *                type: string
 *                example: Australia.
 *                nullable: true
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
 *                format: binary
 *                description: Optional image file
 *                nullable: true
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
router.put("/:id", upload.single('image'), verifyToken, imageUploadValidator, updateVehicleValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let vehicleData = req.body;
            if (req.file){
                vehicleData.image = req.file
            }
            const data = await vehicleController.updateVehicle(req.params.id, vehicleData, req.userId);
            switch (data) {
                case 404:
                    res.sendStatus(404);
                    break;
                case 401:
                    res.status(401).json({errors: [{"msg":"Unauthorized"}]});
                    break;
                default:
                    res.send({result:200, data:data});
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
router.delete("/:id", verifyToken, idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await vehicleController.deleteVehicle(req.params.id, req.userId);
            switch (data) {
                case 404:
                    res.sendStatus(404);
                    break;
                case 401:
                    res.status(401).json({errors: [{"msg":"Unauthorized"}]});
                    break;
                default:
                    res.send({result:200, data:data});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;