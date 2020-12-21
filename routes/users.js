//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

//----------* MIDDLEWARES REQUIRE'S *----------//
const registerMiddleware = require('../middlewares/registerMW');
const loginMiddleware = require('../middlewares/loginMW'); 
/* const authMiddlaware = require('../middlewares/authMW');
const guestMiddlaware = require('../middlewares/guestMW'); */

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
router.get('/listado', usersController.usersFullList); 
router.get('/registro', /* guestMiddlaware, */ usersController.registerForm);                  //-> Formulario de registro
router.post('/registro', upload.any(), registerMiddleware, usersController.createUser); //-> Crear un usuario 
router.get('/login', /* guestMiddlaware, */ usersController.loginForm);                        //-> Formulario de inicio de sesión
router.post('/login', loginMiddleware, usersController.processLogin);                //-> Formulario de inicio de sesión
router.get('/perfil', /* authMiddlaware, */ usersController.profile);                        //-> Perfil de usuario
router.get('/editar', /* authMiddlaware, */ usersController.editForm);                //-> Mostrar formulario de edición de perfil
router.put('/editar', upload.any(), usersController.editProfile);             //-> Editar perfil usuario
router.delete('/eliminar', usersController.delete);             //-> Borrar un usuario
router.get('/logout', /* authMiddlaware, */ usersController.logout);   // Cierra la sesión          

//----------* EXPORTS ROUTER *----------//
module.exports = router;