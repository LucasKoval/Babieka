//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Listado de Ordenes de compra emitidas - http://localhost:3030/api/cart/orders
    orderList: async (req, res) => { 
        const ordersList = await db.Order.findAndCountAll({
            include: ['user']
        });

        res.json({
            meta: {
                status: 'success',
                count: ordersList.count
            },
            data: {
                ordersList
            }
        });
    },

    // Listado de Productos comprados - http://localhost:3030/api/cart/items
    purchasedProducts: async (req, res) => {
        const purchasedProducts = await db.Item.findAndCountAll({
            include: ['user'],
            where: {
                status: 1,
            }
        });

        res.json({
            meta: {
                status: 'success',
                count: purchasedProducts.count
            },
            data: {
                purchasedProducts
            }
        });
    },

    // Estadisticas de Usuario - http://localhost:3030/api/cart/users/:id
    userStats: async (req, res) => { 
        const user = await db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name', 'email', 'image'],
            include: ['orders', 'items']
        });

        const totalPurchasedProducts = user.items.reduce((acum, current) => {
            return acum += Number(current.quantity)
        }, 0);

        const totalMoneySpent = user.orders.reduce((acum, current) => {
            return acum += Number(current.total)
        }, 0);
        
        user.dataValues.totalPurchasedProducts = totalPurchasedProducts;
        user.dataValues.totalMoneySpent = totalMoneySpent;
        user.dataValues.urlImage = `http://localhost:3030/img/users/${user.image}`;
        user.dataValues.urlDetail = `http://localhost:3030/api/users/${req.params.id}`;

        res.json({
            meta: {
                status: 'success',
            },
            data: {
                user
            }
        });
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;