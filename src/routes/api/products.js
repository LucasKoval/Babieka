//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiProductsController = require('../../controllers/api/productsController');   //-> Controlador de Usuarios


//----------* PRODUCTS ROUTES *----------//
router.get('/', apiProductsController.list);        //-> Listado Completo
router.get('/:id', apiProductsController.detail);   //-> Detalle de producto                       


//----------* EXPORTS ROUTER *----------//
module.exports = router;