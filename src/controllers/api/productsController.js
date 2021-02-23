//----------* REQUIRE'S *----------//
const db = require('../../db/models');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // URL: http://localhost:3030/api/products/
    // Renderiza el Listado Completo de Productos
    list: async (req, res) => { 
        const AllProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            /* group: ['model.id'] */
        });
        const products = AllProducts.rows.map(product => {
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
                count: AllProducts.count,
                count_Category_Casual: casual.length,
                count_Category_Fiesta: fiesta.length,
                count_Category_Sale: sale.length
            },
            data: {
                products
            }
        });
    },

    // URL: http://localhost:3030/api/products/list
    // Renderiza el Listado Paginado de Productos
    paginatedList: async (req, res) => {
        const page = Number(req.query.page) || 1;
        const AllProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            limit: 10,
            offset: 10 * (page - 1)
            /* group: ['model.id'] */
        });
        const totalPages = Math.ceil(AllProducts.count / 10) 
        const products = AllProducts.rows.map(product => {
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
                count: AllProducts.count,
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

    // URL: http://localhost:3030/api/products/models
    // Renderiza el Listado Completo de Modelos
    modelList: async (req, res) => { 
        const AllProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id']
        });
        const products = AllProducts.rows.map(product => {
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

    // URL: http://localhost:3030/api/products/models/list
    // Renderiza el Listado Paginado de Modelos
    /* 
    paginatedModelList: async (req, res) => {
        const page = Number(req.query.page) || 1;
        const AllProducts = await db.Product.findAndCountAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id'],
            limit: 6,
            offset: 6 * (page - 1),
                        
        });
        const products = AllProducts.rows.map(product => {
            return (
                product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`,
                product.dataValues.urlDetail = `http://localhost:3030/api/products/${product.id}`,
                product
            )
        });
        const totalPages = Math.ceil(AllProducts.count / 6)
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
                count: AllProducts.length,
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
    */

    // URL: http://localhost:3030/api/products/:id
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
        product.dataValues.urlImage = `http://localhost:3030/img/products/${product.model.image.name}`
        product.dataValues.urlDetail = `http://localhost:3030/api/products/${req.params.id}`
        res.json(product);  
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;