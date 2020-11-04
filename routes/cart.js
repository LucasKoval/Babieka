const express = require('express');
const router = express.Router();
const controllerCart = require ('../controllers/controllerCart');

/* GET cart. */
router.get('/', controllerCart.cart);

module.exports = router;
