//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiUsersController = require('../../controllers/api/usersController');   //-> Controlador de Usuarios


//----------* USERS ROUTES *----------//
router.get('/', apiUsersController.list);        //-> Mostrar listado de usuarios
router.get('/:id', apiUsersController.detail);   //-> Detalle de producto   


//----------* EXPORTS ROUTER *----------//
module.exports = router;