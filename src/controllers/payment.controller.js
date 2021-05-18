const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');
const ApiError = require('../utils/ApiError');

const getPaymentForAppointment = catchAsync(async (req, res) => {
    const payment = await paymentService.getPaymentForAppointment(req.params.appointmentId);
    if (!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    res.status(httpStatus.OK).send(payment);
});

const getPayment = catchAsync(async (req, res) => {
    const payment = await paymentService.getPaymentById(req.params.paymentId);
    if (!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    res.status(httpStatus.OK).send(payment);
});

const getPayments = catchAsync(async (req, res) => {
    const payment = await paymentService.getAllPayments();
    res.status(httpStatus.OK).send(payment);
});

const updatePayment = catchAsync(async (req, res) => {
    const payment = await paymentService.updatePayment(req.body, req.params.paymentId);
    res.status(httpStatus.OK).send(payment);
});

const deletePayment = catchAsync(async (req, res) => {
    await paymentService.deletePayment(req.params.paymentId);
    res.status(httpStatus.NO_CONTENT).send();
});

const pay = catchAsync(async (req, res) => {
    const payment = await paymentService.pay(req.params.paymentId);
    res.status(httpStatus.OK).send(payment);
});

module.exports = {
    getPaymentForAppointment,
    getPayment,
    updatePayment,
    deletePayment,
    getPayments,
    pay
};
