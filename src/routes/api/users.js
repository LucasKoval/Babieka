//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiUsersController = require('../../controllers/api/usersController');   //-> Controlador de Usuarios


//----------* USERS ROUTES *----------//
router.get('/listado', apiUsersController.list);   //-> Mostrar listado de usuarios   


//----------* EXPORTS ROUTER *----------//
module.exports = router;