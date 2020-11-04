const express = require('express');
const router = express.Router();
const controllerLogin = require('../controllers/controllerLogin')

/* GET login. */
router.get('/', controllerLogin.login);

module.exports = router;
