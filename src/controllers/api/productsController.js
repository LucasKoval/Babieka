//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // URL: http://localhost:3000/api/products/
    // Renderiza la vista Listado Completo de Productos
    list: async (req, res) => { 
        const Allproducts = await db.Product.findAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id']
        });
        const products = Allproducts.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3000/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3000/api/products/${product.id}`,
                product
            )
        });
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
                products
            }
        });
    },

    // URL: http://localhost:3000/api/products/:id
    // Renderiza la vista Detalle de Producto
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
        product.dataValues.urlImage = `http://localhost:3000/img/products/${product.model.image.name}`
        product.dataValues.urlDetail = `http://localhost:3000/api/products/${req.params.id}`
        res.json(product);  
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;