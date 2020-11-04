const express = require('express');
const router = express.Router();
const controllerRegister = require('../controllers/controllerRegister');

/* GET register. */
router.get('/', controllerRegister.register);

module.exports = router;
