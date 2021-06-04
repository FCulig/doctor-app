const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { statsService } = require('../services');
const ApiError = require('../utils/ApiError');

const getDashboardStatistics = catchAsync(async (req, res) => {
    const stats = await statsService.getDashboardStatistics();
    res.status(httpStatus.OK).send(stats);
});

module.exports = {
    getDashboardStatistics
}