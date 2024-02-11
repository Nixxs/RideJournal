const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator } = require("../validators");
const {likeValidator} = require("../validators/likeValidator");

/**
 * @swagger
 * /api/likes:
 *  get:
 *    description: Use to request all likes
 *    tags:
 *      - Likes
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Image not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
    try {
        const data = await likeController.getLikes();
        res.send({result:200, data: data});
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/likes/{id}:
 *  get:
 *    description: Use to request a like by ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of like to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Like not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await likeController.getLike(req.params.id);
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
 * /api/likes/event/{id}:
 *  get:
 *    description: Use to request likes for a given event ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the event the likes are attached to
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Likes not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/event/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await likeController.getLikesByEvent(req.params.id);
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
 * /api/likes/user/{id}:
 *  get:
 *    description: Use to request likes for a given user ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the user the likes are attached to
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Likes not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/user/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await likeController.getLikesByUser(req.params.id);
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
 * /api/likes:
 *  post:
 *    description: Use to create a new likes
 *    tags:
 *      - Likes
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - eventId
 *         - userId
 *        properties:
 *         eventId:
 *          type: integer
 *          example: 3
 *         userId:
 *          type: integer
 *          example: 2
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Likes not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", likeValidator, async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await likeController.createLike(req.body);
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
 * /api/likes/{id}:
 *  delete:
 *    description: Use to delete a image by ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of image to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Image not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await likeController.deleteLike(req.params.id);
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