//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Listado de Ordenes de compra emitidas - https://babieka.herokuapp.com/api/cart/orders
    orderList: async (req, res) => {
        try {
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

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Listado de Productos comprados - https://babieka.herokuapp.com/api/cart/items
    purchasedProducts: async (req, res) => {
        try {
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

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Últimos 5 Productos agregados al carrito - https://babieka.herokuapp.com/api/cart/lastAdded
    lastAdded: async (req, res) => {
        try {
            const purchasedProducts = await db.Item.findAll({
                include: ['user'],
                where: {
                    status: 1,
                }
            });
            
            const lastAdded=[];
    
            for(let i=1; i < 6 ; i++){
                lastAdded.push(purchasedProducts[purchasedProducts.length - i])
            }
    
            console.log(lastAdded)
    
            const products = lastAdded.map(product => {
                return (
                    product.dataValues.urlImage = `https://babieka.herokuapp.com/img/products/${product.image}`,
                    product
                )
            });
    
            res.json({
                meta: {
                    status: 'success'
                },
                data: {
                    products
                }
            });

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Estadisticas de Usuario - https://babieka.herokuapp.com/api/cart/users/:id
    userStats: async (req, res) => {
        try {
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
            user.dataValues.urlImage = `https://babieka.herokuapp.com/img/users/${user.image}`;
            user.dataValues.urlDetail = `https://babieka.herokuapp.com/api/users/${req.params.id}`;
    
            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    user
                }
            });

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;