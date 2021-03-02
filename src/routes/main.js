//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const mainController = require('../controllers/mainController');   //-> Controlador principal


//----------* MAIN ROUTES *----------//
router.get('/', mainController.index);                  //-> Renderiza la vista Homepage
router.get('/buscar', mainController.search);           //-> Renderiza la vista Resultado de la busqueda
router.get('/nosotros', mainController.aboutUs);        //-> Renderiza la vista Nosotros
router.get('/como-comprar', mainController.howToBuy);   //-> Renderiza la vista Como comprar


//----------* EXPORTS ROUTER *----------//
module.exports = router;