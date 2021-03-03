//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const cartController = require('../controllers/cartController');   //-> Controlador del Carrito


//----------* MAIN ROUTES *----------//
router.get('/', cartController.cart);                                 //-> Renderiza la vista Carrito
router.post('/:id/agregar', cartController.addItem);                  //-> Agrega un Producto al Carrito.
router.post('/:id/eliminar', cartController.removeItem);              //-> Elimina un Producto del Carrito
router.post('/finalizar-compra', cartController.buyItem);             //-> Procesa la Compra del Producto
router.get('/compra-finalizada', cartController.purchaseCompleted);   //-> Renderiza la vista Compra Finalizada
router.get('/mis-compras', cartController.myPurchases);               //-> Renderiza la vista Mis Compras


//----------* EXPORTS ROUTER *----------//
module.exports = router;