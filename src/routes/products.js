//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const productsController = require('../controllers/productsController');   //-> Controlador de Productos
const productValidator = require('../middlewares/productValidator');       //-> Validador para formularios de Producto
const multer = require('../middlewares/multerProducts');                   //-> Multer para Productos
const authMW = require('../middlewares/authMW');                           //-> Middleware para Usuario sin login
const adminMW = require('../middlewares/adminMW');                         //-> Middleware para Usuario Admin


//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);                                                  //-> Renderiza la vista Colección
router.get('/sale', productsController.sale);                                              //-> Renderiza la vista Sale
router.get('/listado', authMW, adminMW, productsController.productsFullList);              //-> Renderiza la vista Listado Completo                   
router.get('/crear', authMW, adminMW, productsController.createForm);                      //-> Renderiza la vista Nuevo Producto
router.post('/crear', multer.any(), productValidator.store, productsController.store);     //-> Crea un Producto (POST)
router.get('/:id/editar', authMW, adminMW, productsController.editForm);                   //-> Renderiza la vista Edición de Producto
router.put('/:id/editar', multer.any(), productValidator.edit, productsController.edit);   //-> Edita un Producto (PUT)
router.delete('/:id/eliminar', productsController.delete);                                 //-> Elimina un Producto (DELETE)
router.get('/:id', productsController.detail);                                             //-> Renderiza la vista Detalle de Producto


//----------* EXPORTS ROUTER *----------//
module.exports = router;