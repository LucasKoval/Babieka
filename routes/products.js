//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);              //-> Listar productos Colección
router.get('/sale', productsController.sale);          //-> Listar productos Sale
router.get('/:id', productsController.detail);         //-> Detalle de producto
router.get('/carrito', productsController.cart);       //-> Carrito   
router.get('/crear', productsController.createForm);   //-> Formulario de creación
//router.post('/crear', productsController.store);     //-> Guardar el producto
router.get('/:id/editar', productsController.editForm);    //-> Mostrar formulario de edición un producto
//router.put('/:id/editar', productsController.edit);  //-> Editar un producto
//router.delete('/:id', productsController.delete);    //-> Borrar un producto


//----------* EXPORTS ROUTER *----------//
module.exports = router;