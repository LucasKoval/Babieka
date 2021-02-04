//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs');
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
            const roles  = await db.Role.findAll();
            return res.render('users/register', {
                errors: errors.mapped(),
                user : req.body,
                roles 
            })
        }
        // Crea un nuevo registro de usuario en la DB
        const password = bcrypt.hashSync(req.body.password, 5)
        await db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name, 
            email: req.body.email,
            password: password,
            role_id: req.session.user && req.session.user.role.name == 'admin' ?  req.body.role : 5,
            image: req.files[0].filename
        })
        if (req.session.user && req.session.user.role.name == 'admin') {
            return res.redirect('/usuario/listado');
        }
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
        const roles = await db.Role.findAll();
        const user = users.find(user => user.email == email)
        return res.render('users/editUser', { user , roles});
    },

    // Edita el perfil de un Usuario (PUT)
    editProfile: async (req, res) => { 
        
        // Verifica que no existan errores al enviar el formulario
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const roles = await db.Role.findAll();
            return res.render('users/editUser', {
                errors: errors.mapped(),
                user : req.body,
                roles
            })
        }
        
        const passwordHashed = bcrypt.hashSync(req.body.password, 5);
        const editedUser = await db.User.findByPk(req.session.user.id, {
            include: ['role']
        });
        await db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password ? passwordHashed : this.password,
            image: req.files[0] ?  req.files[0].filename : this.image,
            role_id: editedUser.role_id != 5 ?  req.body.role : this.role
        },
        {where: {
            id: editedUser.id
        }},
        {include: ['role']});
        req.session.user = await db.User.findByPk(req.session.user.id, {
            include: ['role']
        });

        res.redirect('/usuario/perfil');       
    },

    // Renderiza el formulario para cambiar la contraseña
    changePassForm: async (req, res) => {    
        return res.render('users/changePassword');
    },

    // Edita la contraseña de un Usuario
    editPassword: async (req, res) => {   
        // Verifica que no existan errores al enviar el formulario
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/changePassword', {
                errors: errors.mapped()
            })
        }
        
        const passwordHashed = bcrypt.hashSync(req.body.newPassword, 5);
        const editedUser = await db.User.findByPk(req.session.user.id);
        await db.User.update({
            password: passwordHashed
        },
        {where: {
            id: editedUser.id
        }});
        req.session.user = await db.User.findByPk(req.session.user.id, {
            include: ['role']
        });

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