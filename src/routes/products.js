//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const productsController = require('../controllers/productsController');   //-> Controlador de Usuarios
const multer = require('../middlewares/multerProducts');                   //-> Multer
const authMW = require('../middlewares/authMW');                           //-> Middleware para usuario sin Login
const adminMW = require('../middlewares/adminMW');                         //-> Middleware para usuario Admin
const productsValidator =require('../middlewares/productsValidator')

//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);                                         //-> Listar productos Colección
router.get('/sale', productsController.sale);                                     //-> Listar productos Sale
router.get('/listado', authMW, adminMW, productsController.productsFullList);     //-> Listado Completo                       
router.get('/crear', authMW, adminMW, productsController.createForm);             //-> Formulario de creación
router.post('/crear', multer.any(), productsValidator, productsController.store); //-> Almacenar el producto
router.get('/:id/editar', authMW, adminMW, productsController.editForm);          //-> Mostrar formulario de edición un producto
router.put('/:id/editar', multer.any(), productsController.edit);                 //-> Editar un producto
router.delete('/:id/eliminar', productsController.delete);                        //-> Borrar un producto
router.get('/:id', productsController.detail);                                    //-> Detalle de producto


//----------* EXPORTS ROUTER *----------//
module.exports = router;