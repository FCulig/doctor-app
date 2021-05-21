const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { callValidation } = require('./../../validations');
const { callController } = require('./../../controllers');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(callValidation.createCall), callController.createCall);
router.get('/', auth('completedRegistration'), callController.getCalls);
router.get('/', auth('completedRegistration'), validate(callValidation.getCall), callController.getCall);
router.put('/:issueId', auth('completedRegistration'), validate(callValidation.updateCall), callController.updateCall);
router.delete('/:issueId', auth('completedRegistration'), validate(callValidation.deleteCall), callController.deleteCall);

module.exports = router;