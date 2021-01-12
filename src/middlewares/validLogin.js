//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs')
const {check,validationResult,body} = require('express-validator');
const helper = require('../helpers/helper');


//----------* VARIABLE'S *----------//
const db = require('../db/models');
const users = db.User.findAll({
    include: ['role']
});


//----------* MIDDLEWARE *----------//
loginValidator = [
    body('email')
        .notEmpty()
            .withMessage('Debe ingresar su email')
            .bail()
        .isEmail()
            .withMessage('Debe ingresar un email válido')
            .bail()
        .custom(async(value, {req})=> {
            let userFound= await users.find({email:value})
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
module.exports = loginValidator;