//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES *----------//
const apiUsersController = require('../../controllers/api/usersController');         //-> Controlador de Usuarios
const apiProductsController = require('../../controllers/api/productsController');   //-> Controlador de Productos
const apiCartController = require('../../controllers/api/cartController');           //-> Controlador del Carrito


//----------* USERS ROUTES *----------//
router.get('/users/', apiUsersController.list);                   //-> Listado de Usuarios
router.get('/users/list', apiUsersController.paginatedList);      //-> Listado de Usuarios paginado
router.get('/users/validUsers', apiUsersController.validUsers);   //-> Listado de Usuarios válidos
router.get('/users/:id', apiUsersController.detail);              //-> Detalle de Usuario   


//----------* PRODUCTS ROUTES *----------//
router.get('/products/', apiProductsController.list);                            //-> Listado de Productos
router.get('/products/list', apiProductsController.paginatedList);               //-> Listado de Productos paginado
router.get('/products/models', apiProductsController.modelList);                 //-> Listado de Modelos
router.get('/products/models/list', apiProductsController.paginatedModelList);   //-> Listado de Modelos paginado
router.get('/products/:id', apiProductsController.detail);                       //-> Detalle de Producto


//----------* CART ROUTES *----------//
router.get('/cart/orders', apiCartController.orderList);          //-> Listado de Ordenes de compra emitidas
router.get('/cart/items', apiCartController.purchasedProducts);   //-> Listado de Productos comprados
router.get('/cart/users/:id', apiCartController.userStats);       //-> Estadisticas de Usuario
router.get('/cart/lastAdded', apiCartController.lastAdded);       //-> Últimos 5 productos agregados al carrito


//----------* EXPORTS ROUTER *----------//
module.exports = router;