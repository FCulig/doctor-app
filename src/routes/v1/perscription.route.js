const express = require('express');
const validate = require('../../middlewares/validate');
const { perscriptionValidation } = require('../../validations/index');
const { perscriptionController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(perscriptionValidation.createPerscription), perscriptionController.createPerscription);
router.get('/', auth('completedRegistration'), perscriptionController.getPerscriptions);
router.get('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.getPerscription), perscriptionController.getPerscription);
router.put('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.updatePerscription), perscriptionController.updatePerscription);
router.delete('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.deletePerscription), perscriptionController.deletePerscription);

module.exports = router;