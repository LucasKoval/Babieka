//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs')
const {check,validationResult,body} = require('express-validator');
const { User } = require('../db/models');


//----------* MIDDLEWARE *----------//
loginValidator = [
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
]


//----------* EXPORTS MIDDLEWARE *----------//
module.exports = loginValidator;