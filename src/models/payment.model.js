const mongoose = require('mongoose');
const { paymentMethods } = require('./../config/paymentMethods');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema({
    appointmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: paymentMethods
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment,
    paymentSchema,
};
