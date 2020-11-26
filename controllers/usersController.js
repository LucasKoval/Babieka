//----------* REQUIRE'S *----------//
const helperUsers = require('../helpers/helperUsers');
const bcryptjs = require('bcrypt');

//----------* VARIABLE'S *----------//


//----------* USERS CONTROLLER *----------//
const usersController = {
    //Renderiza la vista Registro
    register: (req, res) => {        
        res.render('users/register');
    },

    //Crear Usuario 
    crear: (req, res) =>{
        const passwordHashed = bcryptjs.hashSync(req.body.password, 5);
        let user = {
            id: helperUsers.getNewId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            password: passwordHashed,
            image: req.files[0].filename
        }
        helperUsers.writeUsers(user);
        return res.redirect('/');
    },
    //Renderiza la vista Login
    login: (req, res) => {        
        res.render('users/login');
    },
    //Renderiza la vista Perfil de usuario
    profile: (req, res) => {        
        res.render('users/profile');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;