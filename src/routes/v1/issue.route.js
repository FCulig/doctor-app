const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { issueValidation } = require('./../../validations');
const { issueController } = require('./../../controllers');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(issueValidation.createIssue), issueController.createIssue);
router.get('/', auth('completedRegistration'), issueController.getAllIssues);
router.get('/:issueId', auth('completedRegistration'), validate(issueValidation.getIssue), issueController.getIssue);
router.get('/user/:userId', auth('completedRegistration'), validate(issueValidation.getUsersIssues), issueController.getUsersIssues);
router.put('/:issueId', auth('completedRegistration'), validate(issueValidation.updateIssue), issueController.updateIssue);
router.delete('/:issueId', auth('completedRegistration'), validate(issueValidation.deleteIssue), issueController.deleteIssue);

module.exports = router;

/*
{
        "id": "609d7aadc0ee293fb8cf4383",
        "type": "patient",
        "description": "Patient is harrasing doctors",
        "created": "2021-05-13T19:14:52.861Z",
        "reporter": {
            "role": "doctor",
            "isVerified": true,
            "isRegistrationComplete": true,
            "phone": "12321",
            "email": "doctor133@mail.com",
            "address": "Brooklyn 123",
            "city": "New York",
            "dateOfBirth": "2010-12-20T00:00:00.000Z",
            "emergencyContact": "ur mom",
            "firstname": "Doctor",
            "gender": "male",
            "lastname": "Doolitlle",
            "dateOfGraduation": "1990-12-01T00:00:00.000Z",
            "licenseNumber": 123213321,
            "speciality": "Brain surgeon",
            "id": "609adac9306fb0530cde626b"
        }
    }
*/