//----------* REQUIRE'S *----------//
const db = require('../db/models');
const {check,validationResult,body} = require('express-validator');


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Renderiza la vista Colección
    list: async (req, res) => {   
        try {
            const products = await db.Product.findAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: [
                    ['id']
                ],
                group: ['model_id']
            });
            
            const fiesta = products.filter((product) => {
                return product.model.category.name == 'Fiesta';
            });
    
            const casual = products.filter((product) => {
                return product.model.category.name == 'Casual';
            });
    
            res.render('products/productsList', {
                fiestaProducts: fiesta,
                casualProducts: casual
            });

        } catch (error) {
            console.log(error);
        }
    },

    // Renderiza la vista Sale
    sale: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: [
                    ['id']
                ],
                group: ['model.name']
            });
    
            const sale = products.filter((product) => {
                return product.model.category.name == 'Sale';
            });
    
            res.render('products/productsSale', {
                saleProducts: sale
            });

        } catch (error) {
            console.log('Error al buscar el listado de Sale.');
        }        
    },

    // Renderiza la vista Listado Completo
    productsFullList: async (req, res) => { 
        try {
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
    
            res.render('products/productsFullList', {
                products,
                models,
                sizes
            });

        } catch (error) {
            console.log('Error al buscar el listado completo de productos.');
        }        
    },

    // Renderiza la vista Detalle de Producto
    detail: async (req, res) => {
        try {
            const allModels = await db.Model.findAll({
                include: ['color']
            });
    
            const allSizes = await db.Size.findAll();
    
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
    
            const models = allModels.filter((model) => {
                return model.name == product.model.name
            });
    
            const sizes = allSizes.filter((size) => {
                return size.number != product.size.number
            });
    
            res.render('products/productDetail', { product, models, sizes });
            
        } catch (error) {
            console.log('Error al buscar el detalle del producto.');
        }  
    },

    // Renderiza la vista Nuevo Producto
    createForm: async (req, res) => { 
        const categories  = await db.Category.findAll();
        const types  = await db.Type.findAll();
        const sizes = await db.Size.findAll();
        const colors = await db.Color.findAll();
        const discounts = await db.Discount.findAll();

        res.render('products/createProduct', { categories, types, sizes, colors, discounts });
    },
    
    // Crea un Producto (POST)
    store: async (req, res) => {     
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const categories  = await db.Category.findAll();
            const types  = await db.Type.findAll();
            const sizes = await db.Size.findAll();
            const colors = await db.Color.findAll();
            const discounts = await db.Discount.findAll();
            return res.render('products/createProduct', {
                errors: errors.mapped(),
                products : req.body,
                categories,
                types,
                sizes,
                colors,
                discounts
            });
        }

        const newImage = await db.Image.create({name: req.files[0].filename});

        const newModel = await db.Model.create({
            category_id: req.body.category,
            type_id: req.body.type,
            name : req.body.name,
            description : req.body.description,
            color_id: req.body.color,
            image_id: newImage.id
        },
        {include: ['category', 'color', 'image', 'type']});

        await db.Product.create({
            model_id: newModel.id,
            size_id: req.body.size,
            discount_id: req.body.discount,
            stock: req.body.stock,
            price: req.body.price
        },
        {include: ['discount', 'model', 'size']});

        return res.redirect('/producto/listado');
    },

    // Renderiza la vista Edición de Producto
    editForm: async (req, res) => { 
        const products = await db.Product.findAll({
            include: ['discount', 'model', 'size']
        });

        const product = products.find(product => product.id == req.params.id);

        const models = await db.Model.findAll({
            include: ['category', 'color', 'image', 'type']
        });

        const model = models.find(model => model.id == product.model_id);    
        const categories  = await db.Category.findAll();
        const types  = await db.Type.findAll();
        const sizes = await db.Size.findAll();
        const colors = await db.Color.findAll();
        const discounts = await db.Discount.findAll();

        res.render('products/editProduct', { model, product, categories, types, sizes, colors, discounts });       
    },

    // Edita un Producto (PUT)
    edit: async (req, res) => {      
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const products = await db.Product.findAll({
                include: ['discount', 'model', 'size']
            });
            const product = products.find(product => product.id == req.params.id); 

            const models = await db.Model.findAll({
                include: ['category', 'color', 'image', 'type']
            });

            const model = models.find(model => model.id == product.model_id);  
            const categories  = await db.Category.findAll();
            const types  = await db.Type.findAll();
            const sizes = await db.Size.findAll();
            const colors = await db.Color.findAll();
            const discounts = await db.Discount.findAll();

            return res.render('products/editProduct', {
                errors: errors.mapped(),
                products: req.body,
                categories,
                model,
                product,
                types,
                sizes,
                colors,
                discounts
            });
        }  

        const editedProduct = await db.Product.findByPk(req.params.id);
        const editedModel = await db.Model.findByPk(editedProduct.model_id);

        await db.Product.update({                 
            size_id: req.body.size,
            discount_id: req.body.discount,
            price: req.body.price,
            stock: req.body.stock
        },
        {where: {
            id: editedProduct.id
        }},
        {include: ['discount', 'model', 'size']});
        
        await db.Model.update({
            name: req.body.name,
            category_id: req.body.category,
            type_id: req.body.type,
            description: req.body.description,
            color_id: req.body.color,
        },
        {where: {
            id: editedProduct.model_id
        }},
        {include:['category', 'color', 'image', 'type']});
        
        await db.Image.update({
            name: req.files[0] ? req.files[0].filename : this.name
        },
        {where: {
            id: editedModel.image_id
        }});

        res.redirect('/producto/'+ editedProduct.id);
    },

    //Elimina un Producto (DELETE)
    delete: async (req, res) => {   
        await db.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        
        return res.redirect('/producto/listado');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;