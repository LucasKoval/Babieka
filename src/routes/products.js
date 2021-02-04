//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const productsController = require('../controllers/productsController');   //-> Controlador de Usuarios
const productValidator = require('../middlewares/productValidator');       //-> Validador para formularios de producto
const multer = require('../middlewares/multerProducts');                   //-> Multer para productos
const authMW = require('../middlewares/authMW');                           //-> Middleware para usuario sin Login
const adminMW = require('../middlewares/adminMW');                         //-> Middleware para usuario Admin


//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);                                                  //-> Listar productos Colección
router.get('/sale', productsController.sale);                                              //-> Listar productos Sale
router.get('/listado', authMW, adminMW, productsController.productsFullList);              //-> Listado Completo                       
router.get('/crear', authMW, adminMW, productsController.createForm);                      //-> Formulario de creación
router.post('/crear', multer.any(), productValidator.store, productsController.store);     //-> Almacenar el producto
router.get('/:id/editar', authMW, adminMW, productsController.editForm);                   //-> Mostrar formulario de edición un producto
router.put('/:id/editar', multer.any(), productValidator.edit, productsController.edit);   //-> Editar un producto
router.delete('/:id/eliminar', productsController.delete);                                 //-> Borrar un producto
router.get('/:id', productsController.detail);                                             //-> Detalle de producto


//----------* EXPORTS ROUTER *----------//
module.exports = router;