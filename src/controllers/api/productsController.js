//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // URL: http://localhost:3000/api/producto/
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
        const casual = products.filter((product) => {
			return product.model.category.name == 'Casual';
        });
        const fiesta = products.filter((product) => {
			return product.model.category.name == 'Fiesta';
		});
        const sale = products.filter((product) => {
			return product.model.category.name == 'Sale';
		});
        res.json({
			meta: {
                status: 'success',
                count: products.length,
                count_Category_Casual: casual.length,
                count_Category_Fiesta: fiesta.length,
                count_Category_Sale: sale.length
            },
            data: {
                products,
                models,
                sizes
            }
        });
    },

    // URL: http://localhost:3000/api/producto/:id
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
        /* const productImg = await db.Product.findByPk(req.params.id, {
            include: ['model'],
            attributes: ['image']
        }); */
        /* const avatarImage = `public/img/products/${productImg.image}` */
        const url = `http://localhost:3000/api/producto/${req.params.id}`
        res.json({
			product,
            /* avatar: {
                avatarImage
            }, */
            detail: {
                url
            }
        });
        /* res.json(product); */  
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;