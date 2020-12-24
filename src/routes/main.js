//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES REQUIRE *----------//
const mainController = require('../controllers/mainController');   //-> Controlador principal


//----------* MAIN ROUTES *----------//
router.get('/', mainController.index);                  //-> Mostrar la Hompage
router.get('/buscar', mainController.search);           //-> Mostrar los resultados de busqueda
router.get('/nosotros', mainController.aboutUs);        //-> Mostrar la vista Nosotros
router.get('/como-comprar', mainController.howToBuy);   //-> Mostrar la vista Como comprar


//----------* EXPORTS ROUTER *----------//
module.exports = router;