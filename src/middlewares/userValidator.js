//----------* REQUIRE'S *----------//
const path = require('path');
const bcrypt = require('bcryptjs')
const {check,validationResult,body} = require('express-validator');
const { User } = require('../db/models');


//----------* MIDDLEWARE *----------//

module.exports = {
    register: [
        body('first_name')
            .notEmpty()
                .withMessage('Debe ingresar su nombre')
                .bail()
            .isLength({min: 2})
                .withMessage('El nombre ingresado debe tener al menos dos caracteres')
                .bail(),
        body('last_name')
        .notEmpty()
            .withMessage('Debe ingresar su apellido')
            .bail()
        .isLength({min: 2})
            .withMessage('El apellido ingresado debe tener al menos dos caracteres')
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
            .isLength({min:8})
                .withMessage('La contraseña debe tener como mínimo 8 caracteres')
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
        /*body('role')
            .custom(function(value, {req}){
                if (req.session.user){
                     return value != undefined
                }
            })
            .withMessage('Debes seleccionar un rol')
            .bail(),*/
        body('image')
            .custom(function(value, { req }){
                return req.files[0];
            })
                .withMessage('Debe ingresar una imagen')
                .bail()
            .custom(function(value, { req }){
                const ext = path.extname(req.files[0].originalname);
                const extValidas = ['.jpg', '.jpeg', '.png', '.gif'];
                return extValidas.includes(ext.toLowerCase());
            })
                .withMessage('La imagen debe tener un fomato válido')
                .bail()
    ],
    
    edit: [
        body('first_name')
            .notEmpty()
                .withMessage('El campo nombre es obligatorio')
                .bail()
            .isLength({min: 2})
                .withMessage('El nombre ingresado debe tener al menos dos caracteres')
                .bail(),
        body('last_name')
            .notEmpty()
                .withMessage('El campo apellido es obligatorio')
                .bail()
            .isLength({min: 2})
                .withMessage('El apellido ingresado debe tener al menos dos caracteres')
                .bail(),
        body('email')
            .notEmpty()
                .withMessage('Debe ingresar un email')
                .bail()
            .isEmail()
                .withMessage('El email ingresado debe ser válido')
                .bail(),
        body('role')
        .custom(function(value, {req}){
            if (req.session.user.role.name == 'admin'){
                    return value != undefined
            }
        })
        .withMessage('Debes seleccionar un rol')
        .bail(),
        body('password')
            .notEmpty()
                .withMessage('Debe ingresar su contraseña para poder editar sus datos')
                .bail()
            .isLength({min:8})
                .withMessage('La contraseña debe tener como mínimo 8 caracteres')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { email: req.body.email }
                }).then(user => {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return Promise.reject('La contraseña ingresada es incorrecta');
                    }
                })
            })
            /* Revisar para que el usuario pueda cambiar el mail y no de erronea la validac de la pass
            .custom((value , {req} )=> {
                return User.findByPk(req.session.user.id).then(user => {
                    if (!bcrypt.compareSync(value, user.password)) {
                    return Promise.reject('La contraseña ingresada es incorrecta');
                    }
                })
            })*/
    ],
    
    login: [
        body('email')
            .notEmpty()
                .withMessage('Debe ingresar su email')
                .bail()
            .isEmail()
                .withMessage('Debe ingresar un email válido')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { email: value }
                }).then(user => {
                    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                    return Promise.reject('El usuario o contraseña ingresados son incorrectos');
                    }
                })
            }),
        body('password')
        .notEmpty()
            .withMessage('Debe ingresar su contraseña')
            .bail()
    ],

    newPass: [
        body('oldPassword')
        .notEmpty()
            .withMessage('Debe ingresar su contraseña actual')
            .bail()
        .custom((value , {req} )=> {
            return User.findOne({ 
                where: 
                { id: req.session.user.id }
            }).then(user => {
                if (!bcrypt.compareSync(value, user.password)) {
                return Promise.reject('La contraseña ingresada es incorrecta');
                }
            })
        }),
        body('newPassword')
            .notEmpty()
                .withMessage('Debe ingresar una nueva contraseña')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { id: req.session.user.id }
                }).then(user => {
                    if (bcrypt.compareSync(value, user.password)) {
                    return Promise.reject('La nueva contraseña debe ser distinta a la anterior');
                    }
                })
            })
            .isLength({min:8})
                .withMessage('La contraseña debe tener como mínimo 8 caracteres')
                .bail(),
        body('repeatNewPassword')
        .notEmpty()
            .withMessage('Debe volver a ingresar su nueva contraseña')
            .bail()
        .custom(function(value, { req }){
            return value == req.body.newPassword
        })
            .withMessage('Las contraseñas no coinciden')
            .bail()
    ]
}