const express = require('express');
const validate = require('../../middlewares/validate');
const { feedbackValidation } = require('../../validations/index');
const { feedbackController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(feedbackValidation.createFeedback), feedbackController.createFeedback);
router.get('/', auth('completedRegistration'), feedbackController.getFeedbacks);
router.get('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.getFeedback), feedbackController.getFeedback);
router.put('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.updateFeedback), feedbackController.updateFeedback);
router.delete('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.deleteFeedback), feedbackController.deleteFeedback);

module.exports = router;