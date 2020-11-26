//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//----------* USERS ROUTES *----------//
router.get('/registro', usersController.register);                //-> Formulario de registro
//router.post('/registro', usersController.createUser);             //-> Crear usuario 
router.get('/login', usersController.login);                      //-> Formulario de inicio de sesión
router.get('/:id/perfil', usersController.profile);               //-> Perfil de usuario
//router.put('/id/perfil', usersController.editProfile);          //-> Editar perfil usuario
//router.delete('/:id/eliminar', userController.delete);          //-> Borrar un usuario


//----------* EXPORTS ROUTER *----------//
module.exports = router;