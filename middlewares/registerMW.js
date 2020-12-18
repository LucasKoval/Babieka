//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const helper = require('../helpers/helper');


//----------* VARIABLE'S *----------//
const users = helper.getAllUsers();


//----------* MIDDLEWARE *----------//
registerMiddleware=[
    body('email')
        .notEmpty()
            .withMessage('Debe ingresar un email')
            .bail()
        .isEmail()
            .withMessage('Debe ingresar un email válido')
            .bail()
        .custom(value => {
            let userFound=users.find(user=>user.email==value)
            return !userFound; 
            })
            .withMessage('El email ya se encuentra registrado')
            .bail(),
    body('password')
        .isLength({min:6})
            .withMessage('La contraseña debe tener como mínimo 6 caracteres')
            .bail()
        /*.custom(function(value, { req }){
            return value == req.body.retype
        })
            .withMessage('Las contraseñas no coinciden')
            .bail(),
    body('retype')
        .notEmpty()
            .withMessage('Debes repetir tu contraseña')
            .bail()*/,
    body('image')
        .custom(function(value, { req }){
            return req.files[0];
        })
            .withMessage('Debe ingresar una imagen')
            .bail()
        .custom(function(value, { req }){
            const ext = path.extname(req.files[0].originalname);
            const extValidas = [".jpg", ".jpeg", ".png"];
            return extValidas.includes(ext.toLowerCase);
        })
            .withMessage('La imagen debe tener un fomato válido')
            .bail()
]

//----------* EXPORTS MIDDLEWARE *----------//
module.exports = registerMiddleware;