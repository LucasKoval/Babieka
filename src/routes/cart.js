//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const cartController = require('../controllers/cartController');   //-> Controlador principal


//----------* MAIN ROUTES *----------//
router.get('/', cartController.cart);                              //-> Mostrar Carrito
router.post('/:id/agregar', cartController.addToCart);             //-> Agregar al Carrito


//----------* EXPORTS ROUTER *----------//
module.exports = router;