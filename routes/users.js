//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');

//----------* VARIABLE'S *----------//
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
router.get('/registro', usersController.register);                //-> Formulario de registro
router.post('/registro',upload.any(), usersController.crear);     //-> Crear usuario 
router.get('/login', usersController.login);                      //-> Formulario de inicio de sesión
router.get('/:id/perfil', usersController.profile);               //-> Perfil de usuario
//router.put('/id/perfil', usersController.editProfile);          //-> Editar perfil usuario
//router.delete('/:id/eliminar', userController.delete);          //-> Borrar un usuario


//----------* EXPORTS ROUTER *----------//
module.exports = router;