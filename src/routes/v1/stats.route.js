const express = require('express');
const auth = require('../../middlewares/auth');
const { statsController } = require('./../../controllers');

const router = express.Router();

router.get('/', auth('admin'), statsController.getDashboardStatistics);

module.exports = router;
