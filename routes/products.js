//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer= require ('multer');
const path = require('path');


//----------* VARIABLE'S *----------//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);                           //-> Listar productos Colección
router.get('/sale', productsController.sale);                       //-> Listar productos Sale
router.get('/carrito', productsController.cart);                    //-> Carrito   
router.get('/crear', productsController.createForm);                //-> Formulario de creación
router.post('/crear', upload.any(), productsController.store);      //-> Guardar el producto
router.get('/:id/editar', productsController.editForm);             //-> Mostrar formulario de edición un producto
router.put('/:id/editar', upload.any(), productsController.edit);   //-> Editar un producto
router.delete('/:id/eliminar', productsController.delete);          //-> Borrar un producto
router.get('/:id', productsController.detail);                      //-> Detalle de producto


//----------* EXPORTS ROUTER *----------//
module.exports = router;