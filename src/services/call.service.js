const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Call, Appointment } = require('../models');

/**
 * Create new video call
 * @param {Object} callBody
 * @returns {Promise}
 */
const createCall = async (conversationBody) => {
    const appointment = await Appointment.findById(conversationBody.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment does not exist');
    }
    const call = await Call.create(conversationBody)
    return call;
};

/**
 * Get all calls
 * @returns {Promise}
 */
const getAllCalls = async () => {
    return Call.find();
};

/**
 * Find calls
 * @param {String} filter
 * @returns {Promise}
 */
const findCalls = async (filter) => {
    return Call.find(filter);
};

/**
 * Get call with Id
 * @param {String} callId
 * @returns {Promise}
 */
const getCallById = async (callId) => {
    return Call.findById(callId);
};

/**
 * Update call
 * @param {Object} callBody
 * @param {String} callId
 * @returns {Promise<Conversation>}
 */
const updateCall = async (callBody, callId) => {
    const call = await getCallById(callId);
    if (!call) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Call not found');
    }
    const appointment = await Appointment.findById(conversationBody.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment does not exist');
    }
    Object.assign(call, callBody);
    await call.save();
    return call;
};

/**
 * Delete call
 * @param {String} callId
 * @returns {Promise}
 */
const deleteCall = async (callId) => {
    const call = await getCallById(callId);
    if (!call) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Call not found');
    }
    await call.remove();
    return call;
};

module.exports = {
    createCall,
    getAllCalls,
    findCalls,
    getCallById,
    updateCall,
    deleteCall
};