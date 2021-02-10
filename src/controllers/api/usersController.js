//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* USERS CONTROLLER *----------//
const usersController = {
    // URL: http://localhost:3000/api/usuario/
    // Renderiza la vista Listado de Usuarios
    list: async (req, res) => { 
        const url = `http://localhost:3000/api/usuario/${req.params.id}`
        const users = await db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
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

    // URL: http://localhost:3000/api/usuario/:id
    // Renderiza la vista Detalle de Usuarios
    detail: async (req, res) => {     
        const user = await db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name', 'email']
        });
        const userImg = await db.User.findByPk(req.params.id, {
            attributes: ['image']
        });
        const url = `http://localhost:3000/api/usuario/${req.params.id}`
        const image = `public/img/users/${userImg.image}`
        res.json({
			user,
            avatar: {
                image
            },
            detail: {
                url
            }
        });
        /* res.json(user); */
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = usersController;