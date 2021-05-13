const Joi = require('joi');

const createAppintment = {
    body: Joi.object().keys({
        patientId: Joi.string().required(),
        doctorId: Joi.string().required(),
        details: Joi.string().required(),
        appointmentDateTime: Joi.string().required(),
        diseaseName: Joi.string().required(),
        paidInAdvance: Joi.boolean()
    }),
};

module.exports = {
    createAppintment,
};
