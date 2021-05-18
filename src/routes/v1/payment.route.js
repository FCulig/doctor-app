const express = require('express');
const validate = require('../../middlewares/validate');
const { paymentValidation } = require('../../validations/index');
const { paymentController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/appointment/:appointmentId', auth('completedRegistration'), validate(paymentValidation.getPaymentForAppointment), paymentController.getPaymentForAppointment);
router.get('/:paymentId', auth('completedRegistration'), validate(paymentValidation.getPayment), paymentController.getPayment);
router.get('/', auth('completedRegistration'), paymentController.getPayments);
router.put('/:paymentId', auth('completedRegistration'), validate(paymentValidation.updatePayment), paymentController.updatePayment);
router.delete('/:paymentId', auth('completedRegistration'), validate(paymentValidation.deletePayment), paymentController.deletePayment);
router.put('/:paymentId/pay', auth('completedRegistration'), validate(paymentValidation.deletePayment), paymentController.pay);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Appointment payments
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   put:
 *     summary: Update payment, for updating isPaid use /{paymentId}/pay
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
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
 *             example:
 *               appointmentId: 60a0f237f46f411448fd9182
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   get:
 *     summary: Get payment with ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
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
 *               $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * /payment/{paymentId}/pay:
 *   put:
 *     summary: Pay for appointment, add balance to doctors account
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
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
 *               $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * /payment/appointment/{appointmentId}:
 *   get:
 *     summary: Get payment for appointment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: appointmentId
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
 *               $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   delete:
 *     summary: Delete payment with ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */