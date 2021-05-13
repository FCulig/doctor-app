const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, appointmentService } = require('../services');

const createAppointmnet = catchAsync(async (req, res) => {
    const appointment = await appointmentService.createAppointment(req.body)
    res.status(httpStatus.OK).send(appointment);
});

const getAppointmnet = catchAsync(async (req, res) => {

    res.status(httpStatus.NO_CONTENT).send();
});

const getAppointmnets = catchAsync(async (req, res) => {

    res.status(httpStatus.NO_CONTENT).send();
});

const updateAppointment = catchAsync(async (req, res) => {

    res.status(httpStatus.NO_CONTENT).send();
});

const deleteAppointment = catchAsync(async (req, res) => {

    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createAppointmnet,
    getAppointmnet,
    getAppointmnets,
    updateAppointment,
    deleteAppointment
};
