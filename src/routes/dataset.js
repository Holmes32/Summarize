const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/datasetController');
router.get('/',datasetController.index);
router.get('/getDataset',datasetController.getDataset);
router.get('/download',datasetController.downloadDataset);
// router.get('/editDataset',datasetController.editDataset);
module.exports = router;