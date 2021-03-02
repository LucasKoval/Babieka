//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const usersController = require('../controllers/usersController');   //-> Controlador de Usuarios
const userValidator = require('../middlewares/userValidator');       //-> Validador para formularios de Usuario
const multer = require('../middlewares/multerUsers');                //-> Multer para Usuarios
const authMW = require('../middlewares/authMW');                     //-> Middleware para Usuario sin Login
const guestMW = require('../middlewares/guestMW');                   //-> Middleware para Usuario con Login
const adminMW = require('../middlewares/adminMW');                   //-> Middleware para Usuario Admin


//----------* USERS ROUTES *----------//
router.get('/listado', authMW, adminMW, usersController.usersFullList);                       //-> Renderiza la vista Listado de Usuarios
router.get('/registro', guestMW, usersController.registerForm);                               //-> Renderiza la vista Registro
router.post('/registro', multer.any(), userValidator.register, usersController.createUser);   //-> Crea un Nuevo Usuario (POST)
router.get('/login', guestMW, usersController.loginForm);                                     //-> Renderiza la vista Login
router.post('/login', userValidator.login, usersController.processLogin);                     //-> Loguea un usuario (POST)
router.get('/perfil', authMW, usersController.profile);                                       //-> Renderiza la vista Perfil de Usuario
router.get('/editar', authMW, usersController.editForm);                                      //-> Renderiza la vista Edición de Usuario
router.post('/editar', multer.any(), userValidator.edit ,usersController.editProfile);        //-> Edita un Usuario (PUT)
router.get('/change-password', authMW, usersController.changePassForm);                       //-> Renderiza el formulario de cambio de contraseña
router.post('/change-password', userValidator.newPass ,usersController.editPassword);         //-> Modifica la contraseña de un Usuario
router.delete('/eliminar', usersController.delete);                                           //-> Elimina al Usuario en session (DELETE)
router.get('/logout', authMW, usersController.logout);                                        //-> Cierra la sesión          


//----------* EXPORTS ROUTER *----------//
module.exports = router;