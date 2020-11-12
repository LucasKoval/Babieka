//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');


//----------* FUNCTIONS *----------//
function getAllUsers() {    //-> Función que contiene a todos los usuarios
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

function getNewId(){
	const users = getAllUsers();
	return users.pop().id + 1;
}

function writeUsers(array) {
	const usersJson = JSON.stringify(array, null, " ");
	fs.writeFileSync(usersFilePath, usersJson);
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