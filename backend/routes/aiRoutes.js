const express = require('express');
const { prioritizeTasksController } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/prioritize', prioritizeTasksController);

module.exports = router;