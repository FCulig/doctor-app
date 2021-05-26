const httpStatus = require('http-status');
const userService = require('./user.service');
const schedulerService = require('./scheduler.service');
const callService = require('./call.service');
const ApiError = require('../utils/ApiError');
const { Appointment } = require('../models');

/**
 * Create new appointment
 * @param {Object} appointmentBody
 * @returns {Promise}
 */
const createAppointment = async (appointmentBody) => {
    const patient = await userService.getUserById(appointmentBody.patientId);
    if (!patient || patient.role !== 'patient') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient does not exist');
    }
    const doctor = await userService.getUserById(appointmentBody.doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor does not exist');
    }
    const appointment = await Appointment.create(appointmentBody);
    schedulerService.scheduleAppointmentNotification(appointment);
    return appointment;
};

/**
 * Get all appointments
 * @returns {Promise}
 */
const getAllAppointments = async () => {
    return Appointment.find();
};

/**
 * Find appointments
 * @returns {Promise}
 */
const findAppointments = async (filter) => {
    return Appointment.find(filter);
};

/**
 * Get issue with Id
 * @param {String} appointmentId
 * @returns {Promise}
 */
const getAppointmentById = async (appointmentId) => {
    return Appointment.findById(appointmentId);
};

/**
 * Update appointment
 * @param {Object} appointmentBody
 * @param {String} appointmentId
 * @returns {Promise}
 */
const updateAppointment = async (appointmentBody, appointmentId) => {
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }
    Object.assign(appointment, appointmentBody);
    await appointment.save();
    return appointment;
};

/**
 * Delete issue
 * @param {String} appointmentId
 * @returns {Promise}
 */
const deleteAppointment = async (appointmentId) => {
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }
    await appointment.remove();
    return appointment;
};

module.exports = {
    createAppointment,
    getAllAppointments,
    findAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
