//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Renderiza la vista Listado Completo
    list: async (req, res) => { 
        const products = await db.Product.findAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id']
        });
        const models = await db.Model.findAll({
            include: ['color']
        });
        const sizes = await db.Size.findAll();
        res.json({
			meta: {
                status: 'success',
                count: products.length
            },
            data: {
                products,
                models,
                sizes
            }
        });
    },

    // Renderiza la vista Detalle de producto
    detail: async (req, res) => {   
        const product = await db.Product.findByPk(req.params.id, {
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.name']
        });
        res.json(product);  
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;