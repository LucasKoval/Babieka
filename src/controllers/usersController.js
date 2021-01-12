//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs');
const helper = require('../helpers/helper');
const {check, validationResult, body} = require('express-validator');
const db = require('../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // Renderiza la vista Listado de Usuarios
    usersFullList: async (req, res) => {   
        const users = await db.User.findAll({
            include: ['role']
        });
        const admin = users.filter((user) => {
			return user.role.name == 'admin';
		});
		const client = users.filter((user) => {
			return user.role.name == 'client';
		});
		res.render('users/usersFullList', {
			adminUsers: admin,
            clientUsers: client,
        });
    },
    
    // Renderiza la vista Registro
    registerForm: async (req, res) => {   
        const roles  = await db.Role.findAll();     
        return res.render('users/register',{roles});
    },

    // Crea un nuevo Usuario (POST)

    createUser: async (req, res) =>{
        // Verifica que no existan errores al enviar el formulario de registro
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                errors: errors.mapped(),
                user : req.body
            })
        }
        const password = bcrypt.hashSync(req.body.password, 5)
        // Crea un nuevo registro de usuario en la DB
        await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
                email: req.body.email,
                password: password,
                role_id: req.body.role,
                image: req.files[0].filename
        })
        return res.redirect('/usuario/login');
    },


    // Renderiza la vista Login
    loginForm: (req, res) => {        
        res.render('users/login');
    },

    // Loguea un usuario (POST)
    processLogin: async (req ,res) => {
        // Verifica que no existan errores al hacer el login
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.mapped(),
                email : req.body.email
            })
        }
        // Verifica que exista el usuario en la DB
		const password = req.body.password;
        const users = await db.User.findAll({
            include: ['role']
        });
        const userExist = users.find(user => user.email == req.body.email);
        // Ejecuta el login si existe el usuario en la DB y las contraseñas coinciden
        if (userExist && bcrypt.compareSync(password, userExist.password)) {
            req.session.user = userExist;
            if (req.body.remember) {
                res.cookie('user_Id', userExist.id, { maxAge: 1000 * 60 * 120 });
            }
            return res.redirect('/usuario/perfil');
        }
        // En caso de ser "false", redirecciona al login
        res.redirect('/usuario/login');
    },

    // Renderiza la vista Perfil de usuario
    profile: (req, res) => {
		res.render('users/profile');
    },

    // Renderiza la vista Edición de Perfil
    editForm: async (req, res) => {    
        const email = req.body.email;
        const users = await db.User.findAll({
            include: ['role']
        });
        const user = users.find(user => user.email == email)
        return res.render('users/editUser', { user });
    },

    // Edita el perfil de un Usuario (PUT)
    editProfile: async (req, res) => { 
        const passwordHashed = bcrypt.hashSync(req.body.password, 5);
        const users = await db.User.findAll({
            include: ['role']
        });
        const editedUser = users.map(function(user){
            if (req.session.user.id == user.id) {
                user.firstName = req.body.firstName; 
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password ? passwordHashed : user.password;
                user.role = user.role.name == 'admin' ?  req.body.role : user.role;
                user.image = req.files[0] ?  req.files[0].filename : user.image;
            } 
            return user
        })
        res.redirect('/usuario/perfil');       
    },

    // Elimina el perfil de un usuario (DELETE)
    delete: async (req, res) => {   
        await db.User.destroy({
            where: {
                id: req.session.user.id
            }
        });
        req.session.destroy();
        res.clearCookie('user_Id');
        return res.redirect('/usuario/registro');
    },

    // Cierra la sesión
    logout: (req, res) => {        
        req.session.destroy();
        res.clearCookie('user_Id');
        return res.redirect('/usuario/login');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;