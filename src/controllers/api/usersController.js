//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // URL: http://localhost:3030/api/users/
    // Renderiza la vista Listado de Usuarios
    list: async (req, res) => { 
        const allUsers = await db.User.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'image'],
            include: ['role']
        });
        const users = allUsers.rows.map(user => {
            return (
                user.dataValues.urlImage = `http://localhost:3030/img/users/${user.image}`,
                user.dataValues.urlDetail = `http://localhost:3030/api/users/${user.id}`,
                user
            )
        });
		res.json({
			meta: {
                status: 'success',
                count: allUsers.count
            },
            data: {
                users
            }
        });
    },

    // URL: http://localhost:3030/api/users/list
    // Renderiza la vista Listado paginado de Usuarios
    paginatedList: async (req, res) => {
        const page = Number(req.query.page) || 1;
        const allUsers = await db.User.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'role_id'],
            limit: 4,
            offset: 4 * (page - 1)
        });
        const totalPages = Math.ceil(allUsers.count / 4) 
        const users = allUsers.rows.map(user => {
            return (
                user.dataValues.urlImage = `http://localhost:3030/img/users/${user.image}`,
                user.dataValues.urlDetail = `http://localhost:3030/api/users/${user.id}`,
                user
            )
        });
		res.json({
			meta: {
                status: 'success',
                count: allUsers.count,
                /* count_Role_Manager: role_id.length,
                count_Role_Admin: x.length,
                count_Role_Programmer: x.length,
                count_Role_Tester: x.length,
                count_Role_Client: x.length, */
                totalPages: totalPages,
                previousPage: page > 1 ? `http://localhost:3030/api/users/list?page=${page - 1}` : null,
                currentPage: `http://localhost:3030/api/users/list?page=${page}`,
                nextPage: page < totalPages ? `http://localhost:3030/api/users/list?page=${page + 1}` : null
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
    },

    // URL: http://localhost:3030/api/users/validUsers
    // Renderiza la vista Detalle de Usuarios válidos
    validUsers: async (req, res) => { 
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
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;