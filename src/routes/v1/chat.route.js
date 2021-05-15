const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { issueValidation } = require('./../../validations');
const { issueController } = require('./../../controllers');

const router = express.Router();

// test chat
router.get("/", (req, res) => {
    //res.send({ "test": true })
    res.sendFile("C:\\Users\\Filip\\Desktop\\Fiver - Laravel\\node-express-boilerplate\\src\\index.html");
});

module.exports = router;