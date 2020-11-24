//----------* REQUIRE'S *----------//
const helperUsers = require('../helpers/helperUsers');

//----------* VARIABLE'S *----------//


//----------* USERS CONTROLLER *----------//
const usersController = {
    //Renderiza la vista Registro
    register: (req, res) => {        
        res.render('users/register');
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