//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // URL: http://localhost:3030/api/users/
    // Renderiza la vista Listado de Usuarios
    list: async (req, res) => { 
        const allUsers = await db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'image']
        });
        const users = allUsers.map(user => {
            return (
                user.dataValues.urlImage = `http://localhost:3030/img/users/${user.image}`,
                user.dataValues.urlDetail = `http://localhost:3030/api/users/${user.id}`,
                user
            )
        });
		res.json({
			meta: {
                status: 'success',
                count: users.length
            },
            data: {
                users
            }
        });
    },

    // URL: http://localhost:3030/api/users/:id
    // Renderiza la vista Detalle de Usuarios
    detail: async (req, res) => {     
        const user = await db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name', 'email', 'image']
        });
        user.dataValues.urlImage = `http://localhost:3030/img/users/${user.image}`
        user.dataValues.urlDetail = `http://localhost:3030/api/users/${req.params.id}`
        res.json(user);
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;