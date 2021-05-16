const express = require('express');
const validate = require('../../middlewares/validate');
const { conversationValidation } = require('../../validations/index');
const { conversationController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(conversationValidation.createConversation), conversationController.createConversation);
router.get('/', auth('completedRegistration'), conversationController.getConversations);
router.get('/:conversationId', auth('completedRegistration'), validate(conversationValidation.getConversation), conversationController.getConversation);
router.get('/user/:userId', auth('completedRegistration'), validate(conversationValidation.getUsersConversation), conversationController.getUsersConversations);
router.put('/:conversationId', auth('completedRegistration'), validate(conversationValidation.updateConversation), conversationController.updateConversation);
router.delete('/:conversationId', auth('completedRegistration'), validate(conversationValidation.deleteConversation), conversationController.deleteConversation);

module.exports = router;

// naglasi da delete kompletno obrise, ako korisnik brise onda samo update na to da je isDeleted:true