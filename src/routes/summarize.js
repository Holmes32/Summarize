const express = require('express');
const router = express.Router();
const summarizeController = require('../controllers/summarizeController');
router.get('/', summarizeController.index);
router.post('/summarize', summarizeController.summarize)
module.exports = router;