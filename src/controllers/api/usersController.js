//----------* REQUIRE'S *----------//
const bcrypt = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const db = require('../../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // Renderiza la vista Listado de Usuarios
    list: async (req, res) => {   
        const users = await db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
        });
		res.json({
			meta: {
                status: 'success',
                count: users.length
            },
            data: {
                users,
            }
        });
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;