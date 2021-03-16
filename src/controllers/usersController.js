//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const db = require('../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // Renderiza la vista Listado de Usuarios
    usersFullList: async (req, res) => {
        try {
            const users = await db.User.findAll({
                include: ['role']
            });
    
            const manager = users.filter((user) => {
                return user.role.name == 'manager';
            });
    
            const admin = users.filter((user) => {
                return user.role.name == 'admin';
            });
    
            const developer = users.filter((user) => {
                return user.role.name == 'developer';
            });
    
            const tester = users.filter((user) => {
                return user.role.name == 'tester';
            });
    
            const client = users.filter((user) => {
                return user.role.name == 'client';
            });
    
            res.render('users/usersFullList', {
                manager: manager,
                adminUsers: admin,
                developerUsers: developer,
                testerUsers: tester,
                clientUsers: client
            });

        }catch (error) {
            console.log(`ERROR: ${error}`);
        } 
    },
    
    // Renderiza la vista Registro
    registerForm: async (req, res) => {
        try {
            const roles  = await db.Role.findAll();     
        
            return res.render('users/register',{roles});

        }catch (error) {
            console.log(`ERROR: ${error}`);
        } 
    },

    // Crea un Nuevo Usuario (POST)
    createUser: async (req, res) =>{
        try {
            // Verifica que no existan errores al enviar el formulario de registro
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const roles  = await db.Role.findAll();
                return res.render('users/register', {
                    errors: errors.mapped(),
                    user : req.body,
                    roles 
                });
            }

            // Crea un nuevo registro de usuario en la DB
            const password = bcrypt.hashSync(req.body.password, 5);
            await db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name, 
                email: req.body.email,
                password: password,
                role_id: req.session.user && req.session.user.role.name == 'admin' ?  req.body.role : 5,
                image: req.files[0].filename
            });

            if (req.session.user && req.session.user.role.name == 'admin') {
                return res.redirect('/usuario/listado');
            }

            return res.redirect('/usuario/login');

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Renderiza la vista Login
    loginForm: (req, res) => {        
        res.render('users/login');
    },

    // Loguea un Usuario (POST)
    processLogin: async (req ,res) => {
        try {
            // Verifica que no existan errores al hacer el login
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/login', {
                    errors: errors.mapped(),
                    email : req.body.email
                });
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

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Renderiza la vista Perfil de Usuario
    profile: (req, res) => {
        res.render('users/profile');
    },

    // Renderiza la vista Edición de Usuario
    editForm: async (req, res) => {
        try {
            const email = req.body.email;
            const users = await db.User.findAll({
                include: ['role']
            });
            const roles = await db.Role.findAll();
            const user = users.find(user => user.email == email)

            return res.render('users/editUser', { user , roles});

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Edita un Usuario (PUT)
    editProfile: async (req, res) => {
        try {
            // Verifica que no existan errores al enviar el formulario
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const roles = await db.Role.findAll();
                return res.render('users/editUser', {
                    errors: errors.mapped(),
                    user : req.body,
                    roles
                });
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

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }     
    },

    // Renderiza el formulario de cambio de contraseña
    changePassForm: async (req, res) => {
        try {
            return res.render('users/changePassword');
        }catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Modifica la contraseña de un Usuario
    editPassword: async (req, res) => {
        try {
            // Verifica que no existan errores al enviar el formulario
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/changePassword', {
                    errors: errors.mapped()
                });
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

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }   
    },

    // Elimina al Usuario en session (DELETE)
    delete: async (req, res) => {   
        try {
            await db.Item.destroy({
                where: {
                    user_id: req.session.user.id
                }
            });

            await db.Order.destroy({
                where: {
                    user_id: req.session.user.id
                }
            });

            await db.User.destroy({
                where: {
                    id: req.session.user.id
                }
            });

            req.session.destroy();
    
            res.clearCookie('user_Id');
    
            return res.redirect('/usuario/registro');

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
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