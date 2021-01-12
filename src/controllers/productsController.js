//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');
const db = require('../db/models');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Renderiza la vista Colección
    list: async (req, res) => {   
        const products = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        const fiesta = products.filter((product) => {
			return product.category.name == 'Fiesta' && product.size.number == 35;
		});
		const casual = products.filter((product) => {
			return product.category.name == 'Casual' && product.size.number == 35;
        });
		res.render('products/productsList', {
			fiestaProducts: fiesta,
            casualProducts: casual
		});
    },

    // Renderiza la vista Sale
    sale: async (req, res) => {   
        const products = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        const sale = products.filter((product) => {
			return product.category.name == 'Sale' && product.size.number == 35;
		});
		res.render('products/productsSale', {
            saleProducts: sale
		});
    },

    // Renderiza la vista Listado Completo
    productsFullList: async (req, res) => {   
        const products = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        const sizes = await db.Size.findAll();
        const fiesta = await products.filter((product) => {
			return product.category.name == 'Fiesta' && product.size.number == 35;
		});
		const casual = await products.filter((product) => {
			return product.category.name == 'Casual' && product.size.number == 35;
        });
        const sale = await products.filter((product) => {
			return product.category.name == 'Sale' && product.size.number == 35;
		});
		res.render('products/productsFullList', {
			fiestaProducts: fiesta,
            casualProducts: casual,
            saleProducts: sale,
            sizes: sizes
		});
    },

    // Renderiza la vista Detalle de producto
    detail: async (req, res) => {   
        const product = await db.Product.findByPk(req.params.id, {
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        res.render('products/productDetail', { product });  
    },

    // Agrega un articulo al Carrito
    addToCart: (req, res) => {
        const products = helper.getAllProducts();
        const cartProducts = helper.getCartProducts();
        const productToAdd = products.find(products => products.id == req.params.id);
        const productsToCart = [...cartProducts, productToAdd];
        helper.writeToCart(productsToCart);
        return res.redirect('/producto/carrito');
    },

    // Renderiza la vista Carrito
    cart: (req, res) => {     
        const products = helper.getCartProducts();
		res.render('products/productCart', {
			cartProducts: products,
		}); 
    },

    // Renderiza la vista Nuevo artículo
    createForm: (req, res) => {  
       /* const product = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });   */   
        res.render('products/createProduct'/*, { product }*/);
    },
    
    // Crea un artículo (POST)
    
    store: async (req, res) => {t
        const newDescription = await db.Description.create({text: req.body.description});
        const newImage = await db.Image.create({name: req.files[0].filename});
        const newModel = await db.Model.create({name: req.body.name});
        await db.Product.create({
            model_id: newModel.id, /* || req.body.selectName */
            price: req.body.price,
            discount_id: req.body.discount,
            stock: req.body.stock,
            color_id: req.body.color,
            size_id: req.body.size,
            category_id: req.body.category,
            type_id: req.body.type,
            description_id: newDescription.id, /* || req.body.selectDescription */
            image_id: newImage.id /* || req.body.selectImage */
        },
        {include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']});
        return res.redirect('/producto/listado');
    },


    // Renderiza la vista Edición de artículo
    editForm: async (req, res) => { 
        const products = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        const product = products.find(product => product.id == req.params.id);     
        const categories  = await db.Category.findAll();
        const types  = await db.Type.findAll();
        const sizes = await db.Size.findAll();
        const colors = await db.Color.findAll();
        const discounts = await db.Discount.findAll();

        res.render('products/editProduct', { product : product, categories : categories, types : types, sizes : sizes, colors : colors, discounts : discounts });       
    },

    // Edita un artículo (PUT)
    edit: async (req, res) => {       
        const editedProduct = await db.Product.findByPk(req.params.id);
        await db.Product.update({                 
            type_id: req.body.type,
            category_id : req.body.category,
            size_id: req.body.size,
            color_id: req.body.color,
            price: req.body.price,
        },
        {where: {
            id: editedProduct.id
        }},
        {include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']});
        
        await db.Model.update({
            name: req.body.model
        },
        {where: {
            id: editedProduct.model_id
        }});

        await db.Description.update({
            text: req.body.description,
        },
        {where: {
            id: editedProduct.description_id
        }});

        await db.Image.update({
            name: req.files[0] ?  req.files[0].filename : this.name
        },
        {where: {
            id: editedProduct.image_id
        }});

        res.redirect('/producto/'+ editedProduct.id);
    },

    //Elimina un artículo (DELETE)
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