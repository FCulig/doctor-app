const scheduler = require('node-schedule');
const socketController = require('./../controllers/socket.controller');
const callService = require('./call.service');

/**
 * Schedule appointment notification
 * @param {Appointment} appointment
 */
const scheduleAppointmentNotification = async (appointment) => {
    const io = socketController.getIO();
    const date = new Date(appointment.appointmentDateTime);
    const call = await callService.createCall({ appointmentId: appointment._id });
    scheduler.scheduleJob(date, function () {
        const doctorScoketId = socketController.connectedClients.get(String(appointment.doctorId));
        const patientScoketId = socketController.connectedClients.get(String(appointment.patientId));
        io.to(doctorScoketId).emit("appointment starting", call._id);
        io.to(patientScoketId).emit("appointment starting", call._id);
    });
};

/**
 * Schedule appointment notification
 */
const scheduleAppointmentNotifications = async (appointments) => {
    const io = socketController.getIO();

    appointments.forEach(async appointment => {
        const date = new Date(appointment.appointmentDateTime);
        const call = await callService.createCall({ appointmentId: appointment._id });
        scheduler.scheduleJob(date, function () {
            const doctorScoketId = socketController.connectedClients.get(String(appointment.doctorId));
            const patientScoketId = socketController.connectedClients.get(String(appointment.patientId));
            io.to(doctorScoketId).emit("appointment starting", call._id);
            io.to(patientScoketId).emit("appointment starting", call._id);
        });
    });
};

module.exports = {
    scheduleAppointmentNotification,
    scheduleAppointmentNotifications
};
