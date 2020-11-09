//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* FUNCTIONS *----------//
function getAllUsers() {    //-> Función que contiene a todos los usuarios
    const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}


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