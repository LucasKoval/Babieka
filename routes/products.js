//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);              //-> Listar productos 
router.get('/sale', productsController.sale);          //-> Listar productos sale
router.get('/:id', productsController.detail); //-> Detalle  de producto
router.get('/carrito', productsController.cart);          
router.get('/crear', productsController.createForm);
//router.post('/crear', productsController.create);
router.get('/:id/editar', productsController.edit);


//----------* EXPORTS ROUTER *----------//
module.exports = router;