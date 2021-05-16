const express = require('express');
const validate = require('../../middlewares/validate');
const { messageValidation } = require('../../validations/index');
const { messageController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(messageValidation.createMessage), messageController.createMessage);
router.get('/:messageId', auth('completedRegistration'), validate(messageValidation.getMessage), messageController.getMesage);
router.get('/conversation/:conversationId', auth('completedRegistration'), validate(messageValidation.getMessagesInConversation), messageController.getMessagesInConversation);
router.put('/:messageId', auth('completedRegistration'), validate(messageValidation.updateMessage), messageController.updateMessage);
router.delete('/:messageId', auth('completedRegistration'), validate(messageValidation.deleteMessage), messageController.deleteMessage);

module.exports = router;
