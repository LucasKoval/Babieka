//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const {check,validationResult,body} = require('express-validator');
const helper = require('../helpers/helper');


//----------* VARIABLE'S *----------//
const users = helper.getAllUsers();


//----------* MIDDLEWARE *----------//
loginMiddleware=[
    body('email')
        .notEmpty()
            .withMessage('Debe ingresar su email')
            .bail()
        .isEmail()
            .withMessage('Debe ingresar un email válido')
            .bail()
        .custom((value, {req})=> {
            let userFound=users.find(user=>user.email==value)
            if(userFound && bcrypt.compareSync(req.body.password, userFound.password)){
                return true; 
            }else{
               return false; 
            }
            })
            .withMessage('El usuario o contraseña ingresados son incorrectos')
            .bail(),
    body('password')
    .notEmpty()
        .withMessage('Debe ingresar su contraseña')
        .bail()
]

//----------* EXPORTS MIDDLEWARE *----------//
module.exports = loginMiddleware;