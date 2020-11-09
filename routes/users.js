//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//----------* USERS ROUTES *----------//
router.get('/registro', usersController.register);
router.get('/login', usersController.login);
router.get('/perfil', usersController.profile);


//----------* EXPORTS ROUTER *----------//
module.exports = router;