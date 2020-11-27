//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs');
const helper = require('../helpers/helper');


//----------* VARIABLE'S *----------//


//----------* USERS CONTROLLER *----------//
const usersController = {
    // Renderiza la vista Registro
    register: (req, res) => {        
        res.render('users/register');
    },

    // Crea un nuevo Usuario 
    createUser: (req, res) =>{
        const users = helper.getAllUsers();
        const passwordHashed = bcrypt.hashSync(req.body.password, 5);
        const user = {
            id: helper.getNewUserId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            password: passwordHashed,
            image: req.files[0].filename
        }
        const usersToSave = [...users,user]
        helper.writeUsers(usersToSave);
        return res.redirect('/');
    },

    // Renderiza la vista Login
    login: (req, res) => {        
        res.render('users/login');
    },

    // Renderiza la vista Perfil de usuario
    profile: (req, res) => {
        const users = helper.getAllUsers();
        const user = users.find(user => user.id == req.params.id);
		res.render('users/profile', {
			user: user,
        });
    },

    // Renderiza la vista Edición de Perfil
    edit: (req, res) => {        
        return res.redirect('/');
    },

    // Edita el perfil de un Usuario
    editProfile: (req, res) => {        
        res.render('users/profile');
    },

    // Elimina el perfil de un usuario
    delete: (req, res) => {        
        const users = helper.getAllUsers();
        const remainingUsers = users.filter((user) => {
			return user.id !== req.params.id;
        });
        helper.writeUsers(remainingUsers);
        return res.redirect('/usuario/registro');
    }
};

//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;