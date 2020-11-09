//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

//----------* MAIN ROUTES *----------//
router.get('/', mainController.index);
router.get('/nosotros', mainController.aboutUs);
router.get('/como-comprar', mainController.howToBuy);


//----------* EXPORTS ROUTER *----------//
module.exports = router;