const express = require('express');
const router = express.Router();
const controllerDetail = require('../controllers/controllerDetail');

/* GET detail. */
router.get('/',controllerDetail.detail);

module.exports = router;
