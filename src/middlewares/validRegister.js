//----------* REQUIRE'S *----------//
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const { User } = require('../db/models');


//----------* MIDDLEWARE *----------//
registerValidator = [
    body('first_name')
        .notEmpty()
            .withMessage('Debe ingresar su nombre')
            .bail(),
    body('last_name')
    .notEmpty()
        .withMessage('Debe ingresar su apellido')
        .bail(),
    body('email')
        .notEmpty()
            .withMessage('Debe ingresar un email')
            .bail()
        .isEmail()
            .withMessage('Debe ingresar un email válido')
            .bail()
        .custom(value => {
            return User.findOne({ 
                where: 
                { email: value }
            }).then(user => {
                if (user) {
                return Promise.reject('El email ya se encuentra registrado');
                }
            })
        }),
    body('password')
        .isLength({min:6})
            .withMessage('La contraseña debe tener como mínimo 6 caracteres')
            .bail()
        .custom(function(value, { req }){
            return value == req.body.repeatpassword
        })
            .withMessage('Las contraseñas no coinciden')
            .bail(),
    body('repeatpassword')
        .notEmpty()
            .withMessage('Debes repetir tu contraseña')
            .bail(),
    body('image')
        .custom(function(value, { req }){
            return req.files[0];
        })
            .withMessage('Debe ingresar una imagen')
            .bail()
        .custom(function(value, { req }){
            const ext = path.extname(req.files[0].originalname);
            const extValidas = [".jpg", ".jpeg", ".png"];
            return extValidas.includes(ext.toLowerCase());
        })
            .withMessage('La imagen debe tener un fomato válido')
            .bail()
]


//----------* EXPORTS MIDDLEWARE *----------//
module.exports = registerValidator;