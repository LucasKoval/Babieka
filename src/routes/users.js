//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const usersController = require('../controllers/usersController');   //-> Controlador de Usuarios
const multer = require('../middlewares/multerUsers');                //-> Multer
const usersValidator = require('../middlewares/usersValidator')  //-> Validaciones de usuarios
const authMW = require('../middlewares/authMW');                     //-> Middleware para usuario sin Login
const guestMW = require('../middlewares/guestMW');                   //-> Middleware para usuario con Login
const adminMW = require('../middlewares/adminMW');                   //-> Middleware para usuario Admin


//----------* USERS ROUTES *----------//
router.get('/listado', authMW, adminMW, usersController.usersFullList);              //-> Mostrar listado de usuarios
router.get('/registro', guestMW, usersController.registerForm);                      //-> Formulario de registro
router.post('/registro', multer.any(), usersValidator.register, usersController.createUser);   //-> Crear un usuario 
router.get('/login', guestMW, usersController.loginForm);                            //-> Formulario de inicio de sesión
router.post('/login', usersValidator.login, usersController.processLogin);         //-> Inicia sesión
router.get('/perfil', authMW, usersController.profile);                              //-> Perfil de usuario
router.get('/editar', authMW, usersController.editForm);                             //-> Mostrar formulario de edición de usuario
router.put('/editar', multer.any(), usersController.editProfile);                    //-> Editar un usuario
router.delete('/eliminar', usersController.delete);                                  //-> Borrar un usuario
router.get('/logout', authMW, usersController.logout);                               //-> Cierra la sesión          


//----------* EXPORTS ROUTER *----------//
module.exports = router;