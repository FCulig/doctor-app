const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { callService } = require('../services');
const ApiError = require('../utils/ApiError');

const createCall = catchAsync(async(req, res) => {
    const call = await callService.createCall(req.body)
    res.status(httpStatus.OK).send(call);
});

const getCall = catchAsync(async(req, res) => {
    const call = await callService.getCallById(req.params.callId);
    if (!call) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Call not found');
    }
    res.status(httpStatus.OK).send(call);
});

const getCalls = catchAsync(async(req, res) => {
    const calls = await callService.getAllCalls();
    res.status(httpStatus.OK).send(calls);
});

const updateCall = catchAsync(async(req, res) => {
    const call = await callService.updateCall(req.body, req.params.callId);
    res.status(httpStatus.OK).send(call);
});

const deleteCall = catchAsync(async(req, res) => {
    await callService.deleteCall(req.params.callId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createCall,
    getCall,
    getCalls,
    updateCall,
    deleteCall
};