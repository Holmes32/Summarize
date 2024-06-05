const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
router.get('/',trainingController.index);
router.get('/dataset',trainingController.dataset);
router.post('/addDataset',trainingController.addDataset); 
module.exports = router;