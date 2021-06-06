const { User, Appointment, Payment } = require('../models');
const MonthNames = require('./../config/monthNames');

/**
 * Get dashboard stats
 */
const getDashboardStatistics = async () => {
    return {
        registeredPatients: await getUserIncreases('patient'),
        registeredDoctors: await getUserIncreases('doctor'),
        revenue: await getRevenueStatistics(),
        payouts: await getPayoutsStatistics(),
        graphAppointments: await getGraphAppointments(),
        graphTotalUsersMonth: await getGraphDataUsersMonthly(),
        graphTotalUsersWeek: await getGraphDataUsersWeekly()
    };
};

module.exports = {
    getDashboardStatistics
}

async function getUserIncreases(role) {
    const date = new Date();
    const totalRegisteredPatients = await User.countDocuments({ role: role, isVerified: true, isRegistrationComplete: true });
    const patitentsLastMonth = await User.countDocuments({ role: role, isVerified: true, isRegistrationComplete: true, createdAt: { $gte: new Date().setMonth(date.getMonth() - 1) } });
    const patitentsTwoMonthsAgo = await User.countDocuments({ role: role, isVerified: true, isRegistrationComplete: true, createdAt: { $gte: new Date().setMonth(date.getMonth() - 2), $lt: new Date().setMonth(date.getMonth() - 1) } });
    const percentage = calculatePercentage(patitentsTwoMonthsAgo, patitentsLastMonth);
    return { total: totalRegisteredPatients, percentage };
}

function calculatePercentage(oldValue, newValue) {
    const increase = newValue - oldValue;
    const percentage = (increase / oldValue) * 100;
    return percentage;
}

async function getRevenueStatistics() {
    const date = new Date();
    const payments = await Payment.find({ isPaid: true });
    const totalRevenue = await getRevenueSumFromAppointments(payments);
    const paymentsLastMonth = await Payment.find({ isPaid: true, createdAt: { $gte: date.setMonth(date.getMonth() - 1) } });
    const revenueLastMonth = await getRevenueSumFromAppointments(paymentsLastMonth);
    const paymentsTwoMonthsAgo = await Payment.find({ isPaid: true, createdAt: { $gte: date.setMonth(date.getMonth() - 2), $lte: date.setMonth(date.getMonth() - 1) } });
    const revenueTwoMonthsAgo = await getRevenueSumFromAppointments(paymentsTwoMonthsAgo);
    const percentage = calculatePercentage(revenueTwoMonthsAgo, revenueLastMonth);
    return { total: totalRevenue, percentage };
}

async function getRevenueSumFromAppointments(appointments) {
    let total = 0;
    for (let i = 0; i < appointments.length; i++) {
        const appointment = await Appointment.findById(appointments[i].appointmentId);
        total = total + appointment.price;
    }
    return total;
}

async function getPayoutsStatistics() {
    const payments = await Payment.find({ isPaid: true });
    const totalRevenue = await getRevenueSumFromAppointments(payments);
    const doctors = await User.find({ role: 'doctor' });
    let currentEarnings = 0;
    for (let i = 0; i < doctors.length; i++) {
        currentEarnings = currentEarnings + doctors[i].earnings;
    }
    const paidOutPercentage = 100 - ((currentEarnings / totalRevenue) * 100);
    return { total: paidOutPercentage };
}

async function getGraphAppointments() {
    let labels = [];
    let data = [];

    const date = new Date();
    for (let i = 1; i < 6; i++) {
        const queryingMonth = date.getMonth() - i;
        if (queryingMonth < 0) {
            labels.push(MonthNames[12 + queryingMonth]);
        } else {
            labels.push(MonthNames[queryingMonth]);
        }

        data.push(await Appointment.countDocuments({ createdAt: { $gte: new Date().setMonth(date.getMonth() - i), $lte: date.setMonth(date.getMonth() - i + 1) } }));
    }

    return { labels: labels.reverse(), data: data.reverse() }
}

async function getGraphDataUsersMonthly() {
    let labels = [];
    let data = [];

    const date = new Date();
    for (let i = 1; i < 9; i++) {
        const queryingMonth = date.getMonth() - i;
        if (queryingMonth < 0) {
            labels.push(MonthNames[12 + queryingMonth]);
        } else {
            labels.push(MonthNames[queryingMonth]);
        }

        data.push(await User.countDocuments({ createdAt: { $gte: new Date().setMonth(date.getMonth() - i), $lte: date.setMonth(date.getMonth() - i + 1) } }));
    }

    return { labels: labels.reverse(), data: data.reverse() }
}

async function getGraphDataUsersWeekly() {
    let labels = [];
    let data = [];

    const date = new Date();
    for (let i = 7; i < 9 * 7; i = i + 7) {
        labels.push(i / 7 + ' week ago');

        data.push(await User.countDocuments({ createdAt: { $gte: new Date().setDate(date.getDate() - i), $lte: new Date().setDate(date.getDate() - i + 7) } }));
    }

    return { labels: labels.reverse(), data: data.reverse() }
}