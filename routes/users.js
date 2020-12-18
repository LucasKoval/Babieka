//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');


//----------* VARIABLE'S *----------//
// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


//----------* USERS ROUTES *----------//
router.get('/registro', usersController.registerForm);                  //-> Formulario de registro
router.post('/registro', upload.any(), usersController.createUser); //-> Crear un usuario 
router.get('/login', usersController.loginForm);                        //-> Formulario de inicio de sesión
router.post('/login', usersController.processLogin);                //-> Formulario de inicio de sesión
router.get('/perfil', usersController.profile);                        //-> Perfil de usuario
router.get('/editar', usersController.editForm);                //-> Mostrar formulario de edición de perfil
router.put('/editar', usersController.editProfile);             //-> Editar perfil usuario
router.delete('/eliminar', usersController.delete);             //-> Borrar un usuario
router.get('/logout', authMiddlaware, userController.logout);   // Cierra la sesión          

//----------* EXPORTS ROUTER *----------//
module.exports = router;