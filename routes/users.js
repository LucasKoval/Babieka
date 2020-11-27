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
router.get('/registro', usersController.register);                  //-> Formulario de registro
router.post('/registro', upload.any(), usersController.createUser); //-> Crear un usuario 
router.get('/login', usersController.login);                        //-> Formulario de inicio de sesión
router.get('/:id', usersController.profile);                        //-> Perfil de usuario
//router.get('/:id/editar', usersController.edit);                  //-> Mostrar formulario de edición de perfil
//router.put('/:id/editar', usersController.editProfile);           //-> Editar perfil usuario
router.delete('/:id/eliminar', usersController.delete);             //-> Borrar un usuario


//----------* EXPORTS ROUTER *----------//
module.exports = router;