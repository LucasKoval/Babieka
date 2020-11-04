const express = require('express');
const router = express.Router();
const controllerUpload = require('../controllers/controllerUpload');

/* GET register. */
router.get('/', controllerUpload.upload);

module.exports = router;
