const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator } = require("../validators");
const {eventValidator, updateEventValidator, eventTypeParamValidator} = require("../validators/eventValidator");

/**
 * @swagger
 * /api/events:
 *  get:
 *    description: Use to request all events
 *    tags:
 *      - Events
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Event not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
    try {
        const data = await eventController.getEvents();
        res.send({result:200, data: data});
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/events/{id}:
 *  get:
 *    description: Use to request a event by ID
 *    tags:
 *      - Events
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of event to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Event not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await eventController.getEvent(req.params.id);
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
 * /api/events/vehicle/{id}:
 *  get:
 *    description: Use to request a event by vehicle ID
 *    tags:
 *      - Events
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of vehicle to fetch events
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Events not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/vehicle/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await eventController.getEventsByVehicle(req.params.id);
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
 * /api/events/type/{type}:
 *  get:
 *    description: Use to request events by type
 *    tags:
 *      - Events
 *    parameters:
 *      - name: type
 *        in: path
 *        description: type of event
 *        required: true
 *        type: string
 *        example: story
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Events not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/type/:type", eventTypeParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await eventController.getEventsByType(req.params.type);
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
 * /api/events:
 *  post:
 *    description: Use to create a new event
 *    tags:
 *      - Events
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - vehicleId
 *              - title
 *              - type
 *            properties:
 *              vehicleId:
 *                type: integer
 *                example: 2
 *              title:
 *                type: string
 *                example: Exhaust Upgrade
 *              detail:
 *                type: string
 *                format: text
 *                example: first we pulled off the old one, then we put on the new one
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [repair, modification, story, maintenance]
 *                example: story
 *              date:
 *                type: string
 *                format: date
 *                example: 2023-06-12
 *              odometer:
 *                type: integer
 *                example: 120000
 *                nullable: true
 *              published:
 *                type: boolean
 *                example: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Event not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", eventValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await eventController.createEvent(req.body);
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
 * /api/events/{id}:
 *  put:
 *    description: Use to update an existing event
 *    tags:
 *      - Events
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of event to update
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              vehicleId:
 *                type: integer
 *                example: 2
 *              title:
 *                type: string
 *                example: Exhaust Tip Upgrade
 *              detail:
 *                type: string
 *                format: text
 *                example: first we pulled off the old one, then we put on the new one
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [repair, modification, story, maintenance]
 *                example: story
 *              date:
 *                type: string
 *                format: date
 *                example: 2023-06-12
 *              odometer:
 *                type: integer
 *                example: 120000
 *                nullable: true
 *              published:
 *                type: boolean
 *                example: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Event not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", updateEventValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await eventController.updateEvent(req.params.id, req.body);
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
 * /api/events/{id}:
 *  delete:
 *    description: Use to delete a event by ID
 *    tags:
 *      - Events
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of event to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Event not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await eventController.deleteEvent(req.params.id);
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