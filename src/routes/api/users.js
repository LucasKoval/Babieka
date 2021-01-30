//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiUsersController = require('../../controllers/api/usersController');   //-> Controlador de Usuarios
const userValidator = require('../../middlewares/userValidator');              //-> Validador para formularios de usuario
const multer = require('../../middlewares/multerUsers');                       //-> Multer para usuarios
const authMW = require('../../middlewares/authMW');                            //-> Middleware para usuario sin Login
const guestMW = require('../../middlewares/guestMW');                          //-> Middleware para usuario con Login
const adminMW = require('../../middlewares/adminMW');                          //-> Middleware para usuario Admin


//----------* USERS ROUTES *----------//
router.get('/listado', apiUsersController.list);    //-> Mostrar listado de usuarios   


//----------* EXPORTS ROUTER *----------//
module.exports = router;