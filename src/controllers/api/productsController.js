//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Listado de Productos - http://localhost:3030/api/products/
    list: async (req, res) => { 
        const allProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ]
        });

        const products = allProducts.rows.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3030/api/products/${product.id}`,
                product
            )
        });

        /* Código alternativo para traer las categorías de los modelos
         const categories = await db.Category.findAll({
            include: {
                all: true,
                nested: true
            }
        });
        const category = categories.map(category => {
            const quantity = category.models.length;
            const name = category.name
            return `${name}: ${quantity}`
        }); */

        const casual = products.filter((product) => {
            return product.model.category.name == 'Casual';
        });
        const fiesta = products.filter((product) => {
            return product.model.category.name == 'Fiesta';
        });
        const sale = products.filter((product) => {
            return product.model.category.name == 'Sale';
        });

        const totalAmount = allProducts.rows.reduce((acum, current) => {
            return acum += Number(current.price)
        }, 0);

        res.json({
            meta: {
                status: 'success',
                count: allProducts.count,
                totalAmount: totalAmount,
                count_Category_Casual: casual.length,
                count_Category_Fiesta: fiesta.length,
                count_Category_Sale: sale.length,
                /* category: category */
            },
            data: {
                products
            }
        });
    },

    // Listado de Productos paginado - http://localhost:3030/api/products/list
    paginatedList: async (req, res) => {
        const page = Number(req.query.page) || 1;

        const allProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            limit: 10,
            offset: 10 * (page - 1)
        });

        const totalPages = Math.ceil(allProducts.count / 10);

        const products = allProducts.rows.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3030/api/products/${product.id}`,
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
                count: allProducts.count,
                count_Category_Casual: casual.length,
                count_Category_Fiesta: fiesta.length,
                count_Category_Sale: sale.length,
                totalPages: totalPages,
                previousPage: page > 1 ? `http://localhost:3030/api/products/list?page=${page - 1}` : null,
                currentPage: `http://localhost:3030/api/products/list?page=${page}`,
                nextPage: page < totalPages ? `http://localhost:3030/api/products/list?page=${page + 1}` : null                
            },
            data: {
                products
            }
        });
    },

    // Listado de Modelos - http://localhost:3030/api/products/models
    modelList: async (req, res) => { 
        const allProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id']
        });

        const products = allProducts.rows.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3030/api/products/${product.id}`,
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

    // Listado de Modelos paginado - http://localhost:3030/api/products/models/list
    paginatedModelList: async (req, res) => {
        const page = Number(req.query.page) || 1;

        const allProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id'],
            limit: 6,
            offset: 6 * (page - 1)                        
        });

        const products = allProducts.rows.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3030/api/products/${product.id}`,
                product
            )
        });

        const totalPages = Math.ceil(allProducts.count.length / 6);

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
                count: allProducts.length,
                count_Category_Casual: casual.length,
                count_Category_Fiesta: fiesta.length,
                count_Category_Sale: sale.length,
                totalPages: totalPages,
                previousPage: page > 1 ? `http://localhost:3030/api/products/models/list?page=${page - 1}` : null,
                currentPage: `http://localhost:3030/api/products/models/list?page=${page}`,
                nextPage: page < totalPages ? `http://localhost:3030/api/products/models/list?page=${page + 1}` : null                
            },
            data: {
                products
            }
        });
    },

    // Detalle de Producto - http://localhost:3030/api/products/:id
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
        
        product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`;
        product.dataValues.urlDetail = `http://localhost:3030/api/products/${req.params.id}`;

        res.json(product);  
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;