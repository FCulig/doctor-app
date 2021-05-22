const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { callValidation } = require('./../../validations');
const { callController } = require('./../../controllers');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(callValidation.createCall), callController.createCall);
router.get('/', auth('completedRegistration'), callController.getCalls);
router.get('/:callId', auth('completedRegistration'), validate(callValidation.getCall), callController.getCall);
router.put('/:callId', auth('completedRegistration'), validate(callValidation.updateCall), callController.updateCall);
router.delete('/:callId', auth('completedRegistration'), validate(callValidation.deleteCall), callController.deleteCall);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Call
 *   description: Video and audio calls between doctors and patients
 */

/**
 * @swagger
 * /call:
 *   post:
 *     summary: Create a new call room
 *     tags: [Call]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *             properties:
 *               appointmentId:
 *                 type: string
 *             example:
 *               appointmentId: 60a0f237f46f411448fd9182
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Call'
 */

/**
 * @swagger
 * /call/{callId}:
 *   put:
 *     summary: Update call room information
 *     tags: [Call]
 *     parameters:
 *       - in: path
 *         name: callId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *               isRoomActive:
 *                 type: string
 *             example:
 *               appointmentId: 60a0f237f46f411448fd9182
 *               isRoomActive: false
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Call'
 */

/**
 * @swagger
 * /call/{callId}:
 *   get:
 *     summary: Get call with ID
 *     tags: [Call]
 *     parameters:
 *       - in: path
 *         name: callId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Call'
 */

/**
 * @swagger
 * /call:
 *   get:
 *     summary: Get all calls
 *     tags: [Call]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Call'
 */

/**
 * @swagger
 * /call/{callId}:
 *   delete:
 *     summary: Delete call with ID
 *     tags: [Call]
 *     parameters:
 *       - in: path
 *         name: callId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */