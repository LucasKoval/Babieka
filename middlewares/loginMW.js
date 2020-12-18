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
            .withMessage('Debe ingresar un email')
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
            .withMessage('Este mail no se encuentra registrado')
            .bail()
]

//----------* EXPORTS MIDDLEWARE *----------//
module.exports = loginMiddleware;