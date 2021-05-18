let multer = require("multer");
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { imageFilter, upload, storage } = require('./../../config/fileUpload');

const router = express.Router();

router.get('/doctor', auth('completedRegistration'), userController.getDoctors);
router.get('/:userId/profile-image', auth('completedRegistration'), userController.getProfileImage);
router.post('/:userId/profile-image', auth('completedRegistration'), upload.single("profile-image"), userController.uploadProfileImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User actions after completed registration process
 */

/**
 * @swagger
 * /user/doctor:
 *   get:
 *     summary: Get all doctors
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * */

/**
 * @swagger
 * /user/{userId}/profile-image:
 *   post:
 *     summary: Upload users profile image
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile-image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/User'
 * */

/**
 * @swagger
 * /user/{userId}/profile-image:
 *   get:
 *     summary: Get users profile image
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               format: binary
 * */