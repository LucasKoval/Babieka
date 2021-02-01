//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiProductsController = require('../../controllers/api/productsController');   //-> Controlador de Usuarios
const productValidator = require('../../middlewares/productValidator');              //-> Validador para formularios de producto
const multer = require('../../middlewares/multerProducts');                          //-> Multer para productos
const authMW = require('../../middlewares/authMW');                                  //-> Middleware para usuario sin Login
const adminMW = require('../../middlewares/adminMW');                                //-> Middleware para usuario Admin


//----------* PRODUCTS ROUTES *----------//
router.get('/', /* authMW, adminMW, */ apiProductsController.list);                           //-> Listado Completo
router.get('/:id', apiProductsController.detail);                                             //-> Detalle de producto                       
/* router.post('/crear', multer.any(), productValidator.store, apiProductsController.store);     //-> Cargar un producto
router.put('/:id/editar', multer.any(), productValidator.edit, apiProductsController.edit);   //-> Editar un producto
router.delete('/:id/eliminar', apiProductsController.delete);                                 //-> Borrar un producto */



//----------* EXPORTS ROUTER *----------//
module.exports = router;