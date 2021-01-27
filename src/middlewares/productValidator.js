//----------* REQUIRE'S *----------//
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const { Product } = require('../db/models');


//----------* MIDDLEWARE *----------//
module.exports = {
    store: [
        body('name')
            .notEmpty()
                .withMessage('Debe ingresar el nombre del modelo')
                .bail(),
        body('category')
            .notEmpty()
                .withMessage('Debe seleccionar una categoría')
                .bail(),
        body('type')
            .notEmpty()
                .withMessage('Debe seleccionar un tipo de artículo')
                .bail(),
        body('size')
            .notEmpty()
                .withMessage('Debe seleccionar un talle')
                .bail(),
        body('color')
            .notEmpty()
                .withMessage('Debe seleccionar un color')
                .bail(),
        body('description')
            .notEmpty()
                .withMessage('Debe ingresar una descripción')
                .bail()
            .isLength({min:20})
                .withMessage('Debe ingresar mas información sobre este artículo')
                .bail(),
        body('image')
            .custom(function(value, { req }){    
                return req.files[0];
            })
                .withMessage('Debe ingresar una imagen')
                .bail()
            .custom(function(value, { req }){    
                const ext = path.extname(req.files[0].originalname);
                const extValidas = [".jpg", ".jpeg", ".png", ".gif"];
                return extValidas.includes(ext.toLowerCase());
            })
            .withMessage('La imagen debe tener un fomato válido')
            .bail(),
        body('stock')
            .notEmpty()
                .withMessage('El artículo no posee stock')
                .bail(),
        body('discount')
            .notEmpty()
                .withMessage('Debe seleccionar un porcentaje de descuento')
                .bail(),
        body('price')
            .notEmpty()
                .withMessage('Debe ingresar un precio')
                .bail()  
    ],

    edit: [
        body('name')
            .notEmpty()
                .withMessage('Debe ingresar el nombre del modelo')
                .bail(),
        body('category')
            .notEmpty()
                .withMessage('Debe seleccionar una categoría')
                .bail(),
        body('type')
            .notEmpty()
                .withMessage('Debe seleccionar un tipo de artículo')
                .bail(),
        body('size')
            .notEmpty()
                .withMessage('Debe seleccionar un talle')
                .bail(),
        body('color')
            .notEmpty()
                .withMessage('Debe seleccionar un color')
                .bail(),
        body('description')
            .notEmpty()
                .withMessage('Debe ingresar una descripción')
                .bail()
            .isLength({min:20})
                .withMessage('Debe ingresar mas información sobre este artículo')
                .bail(),
        body('image')
            .custom(function(value, { req }){
                if(typeof req.files[0] != "undefined"){
                    const ext = path.extname(req.files[0].originalname);
                    const extValidas = [".jpg", ".jpeg", ".png", ".gif"];
                    return extValidas.includes(ext.toLowerCase());
                }else{
                    return true;
                }   
            })
            .withMessage('La imagen debe tener un fomato válido')
            .bail(),
        body('stock')
            .notEmpty()
                .withMessage('El artículo no posee stock')
                .bail(),
        body('discount')
            .notEmpty()
                .withMessage('Debe seleccionar un porcentaje de descuento')
                .bail(),
        body('price')
            .notEmpty()
                .withMessage('Debe ingresar un precio')
                .bail()  
    ]
}