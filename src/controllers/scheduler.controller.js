const catchAsync = require('../utils/catchAsync');
const { schedulerService, appointmentService } = require('./../services/index');

const scheduleAppointmentNotifications = catchAsync(async () => {
    const appointments = await appointmentService.findAppointments({ appointmentDateTime: { $gte: new Date() } });
    console.log(appointments);
    schedulerService.scheduleAppointmentNotifications(appointments);
});

module.exports = {
    scheduleAppointmentNotifications
};
