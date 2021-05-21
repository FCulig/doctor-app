const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const callSchema = mongoose.Schema({
    appointmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    isRoomActive: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
callSchema.plugin(toJSON);
callSchema.plugin(paginate);

/**
 * @typedef Call
 */
const Call = mongoose.model('Call', callSchema);

module.exports = {
    Call,
    callSchema,
};