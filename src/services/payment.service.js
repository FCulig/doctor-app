const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Conversation, User, Message, Payment } = require('../models');
const { conversationService, appointmentService } = require('.');
const { getMessage } = require('../validations/message.validation');

/**
 * Create new payment
 * @param {Object} paymentBody
 * @returns {Promise}
 */
const createPayment = async (paymentBody) => {
    const appointment = await appointmentService.getAppointmentById(paymentBody.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment does not exist');
    }
    const payment = await Payment.create(paymentBody)
    return payment;
};

/**
 * Get all payments
 * @param {String} conversationId
 * @returns {Promise}
 */
const getAllPayments = async () => {
    return Payment.find();
};

/**
 * Get payment with Id
 * @param {String} paymentId
 * @returns {Promise}
 */
const getPaymentById = async (paymentId) => {
    return Payment.findById(paymentId);
};

/**
 * Get payment for appointment with Id
 * @param {String} appointmentId
 * @returns {Promise}
 */
const getPaymentForAppointment = async (appointmentId) => {
    return Payment.findOne({ appointmentId: appointmentId });
};

/**
 * Update payment
 * @param {Object} messageBody
 * @param {String} paymentId
 * @returns {Promise<Payment>}
 */
const updatePayment = async (paymentBody, paymentId) => {
    const payment = await getPaymentById(paymentId);
    if (!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    Object.assign(payment, paymentBody);
    await payment.save();
    return payment;
};

/**
 * Delete payment
 * @param {String} paymentId
 * @returns {Promise}
 */
const deletePayment = async (paymentId) => {
    const payment = await getPaymentById(paymentId);
    if (!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    await payment.remove();
    return payment;
};

/**
 * Pay for the appointment. Adds earnings to doctors account.
 * @param {String} paymentId
 * @returns {Promise}
 */
const pay = async (paymentId) => {
    let payment = await getPaymentById(paymentId);
    if (!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    const appointment = await appointmentService.getAppointmentById(payment.appointmentId);
    const doctor = await userService.getUserById(appointment.doctorId);
    const doctorsEarnings = doctor.earnings + appointment.price;
    await userService.updateUserById(doctor._id, { earnings: doctorsEarnings });
    payment = await updatePayment({ isPaid: true }, paymentId);
    return payment;
};


module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentForAppointment,
    updatePayment,
    deletePayment,
    pay
};
