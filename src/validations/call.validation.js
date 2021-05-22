const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCall = {
    body: Joi.object().keys({
        appointmentId: Joi.string().custom(objectId),
    }),
};

const getcall = {
    params: Joi.object().keys({
        callId: Joi.string().custom(objectId),
    }),
};

const deleteCall = {
    params: Joi.object().keys({
        callId: Joi.string().custom(objectId),
    }),
};

const updateCall = {
    params: Joi.object().keys({
        callId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            appointmentId: Joi.string().custom(objectId),
            isRoomActive: Joi.boolean(),
        })
        .min(1),
};

module.exports = {
    createCall,
    getcall,
    deleteCall,
    updateCall
};