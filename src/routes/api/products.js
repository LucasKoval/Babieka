//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const apiProductsController = require('../../controllers/api/productsController');   //-> Controlador de Usuarios


//----------* PRODUCTS ROUTES *----------//
router.get('/', apiProductsController.list);                //-> Listado Completo de Productos
router.get('/list', apiProductsController.paginatedList);   //-> Listado Paginado de Productos
router.get('/models', apiProductsController.modelList);     //-> Listado Completo de Modelos
/* router.get('/models/list', apiProductsController.paginatedModelList); */   //-> Listado Paginado de Productos
router.get('/:id', apiProductsController.detail);           //-> Detalle de Producto                       


//----------* EXPORTS ROUTER *----------//
module.exports = router;