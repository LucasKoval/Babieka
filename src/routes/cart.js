//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const cartController = require('../controllers/cartController');   //-> Controlador principal


//----------* MAIN ROUTES *----------//
router.get('/', cartController.cart);                                 //-> Mostrar Carrito
router.post('/:id/agregar', cartController.addItem);                  //-> Agregar al Carrito
router.post('/:id/eliminar', cartController.removeItem);              //-> Eliminar del carrito
router.post('/finalizar-compra', cartController.buyItem);             //-> Procesa la compra del artículo
router.get('/compra-finalizada', cartController.purchaseCompleted);   //-> Renderiza la vista de la compra finalizada
router.get('/mis-compras', cartController.myPurchases);   //-> Renderiza la vista de la compra finalizada


//----------* EXPORTS ROUTER *----------//
module.exports = router;