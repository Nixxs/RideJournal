const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// import multer for image file hanlding
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator, imageUploadValidator } = require("../validators");
const {userValidator, updateUserValidator, uniqueEmailValidator, userLoginValidator} = require("../validators/userValidator");

// import security related things
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../auth/authMiddleware');

/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Use to request all users
 *    tags:
 *      - Users
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
        const data = await userController.getUsers();
        res.send({result:200, data: data});
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    description: Use to request a user by ID
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await userController.getUser(req.params.id);
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
 * /api/users/{id}/vehicles:
 *  get:
 *    description: Use to request a user by ID with all included data
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id/vehicles", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await userController.getUserIncludeVehicles(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                const filteredData = data.toJSON();
                delete filteredData.email;
                delete filteredData.password;
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
 * /api/users:
 *  post:
 *    description: Use to create a new user
 *    tags:
 *      - Users
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: John Doe
 *              email:
 *                type: string
 *                example: john@dudes.com
 *              password:
 *                type: string
 *                example: password
 *              profile:
 *                type: string
 *                example: im a great guy, just so great
 *                nullable: true
 *              image:
 *                type: string
 *                format: binary
 *                description: Optional image file
 *                nullable: true
 *            required:
 *              - name
 *              - email
 *              - password
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid input
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", upload.single('image'), imageUploadValidator, uniqueEmailValidator, userValidator, async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (errors.isEmpty()){
            let userData = req.body;
            userData.password = await bcrypt.hashSync(userData.password, saltRounds);

            if (req.file){
                userData.image = req.file
            }
            const data = await userController.createUser(userData);

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
 * /api/users/login:
 *  post:
 *    description: Use to login a user and get back an authorization token
 *    tags:
 *      - Users
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - email
 *         - password
 *        properties:
 *         email:
 *          type: string
 *          example: john@dudes.com
 *         password:
 *          type: string
 *          example: password
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
router.post("/login", userLoginValidator, async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const userData = await userController.getUserByEmail(req.body.email);
            if(userData){
                const match = await bcrypt.compare(req.body.password, userData.password);
                if(match){
                    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
                        expiresIn: "1h"
                    });
    
                    const payloadData = {token: token, user: userData};
                    res.send({ result: 200, data: payloadData });
                }else{
                    res.status(404).json({errors: [{"msg": "Invalid email or password"}]});
                }
            }else{
                res.status(404).json({errors: [{"msg": "Invalid email or password"}]});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err){
      next(err);
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    security:
 *     - bearerAuth: []
 *    description: Use to update a new user
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to update
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
 *              name:
 *                type: string
 *                example: John Doe
 *              email:
 *                type: string
 *                example: john@dudes.com
 *              password:
 *                type: string
 *                example: password
 *              profile:
 *                type: string
 *                example: im a great guy, just so great
 *                nullable: true
 *              image:
 *                type: string
 *                format: binary
 *                description: Optional image file
 *                nullable: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid input
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", upload.single('image'), verifyToken, imageUploadValidator, uniqueEmailValidator, updateUserValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let userData = req.body;

            if (userData.password){
                userData.password = await bcrypt.hash(userData.password, saltRounds);
            }

            if (req.file){
                userData.image = req.file
            }
            const data = await userController.updateUser(req.params.id, userData);

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
 * /api/users/{id}:
 *  delete:
 *    description: Use to delete a user by ID
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await userController.deleteUser(req.params.id);
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