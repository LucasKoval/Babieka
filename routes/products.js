//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);
router.get('/sale', productsController.sale);
router.get('/detalle/:id', productsController.detail);
router.get('/carrito', productsController.cart);
router.get('/cargar', productsController.create);
router.get('/editar', productsController.edit);


//----------* EXPORTS ROUTER *----------//
module.exports = router;