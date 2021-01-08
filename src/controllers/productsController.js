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
        const fiesta = products.filter((product) => {
			return product.category.name == 'Fiesta' && product.size.number == 35;
		});
		const casual = products.filter((product) => {
			return product.category.name == 'Casual' && product.size.number == 35;
        });
        const sale = products.filter((product) => {
			return product.category.name == 'Sale' && product.size.number == 35;
		});
		res.render('products/productsFullList', {
			fiestaProducts: fiesta,
            casualProducts: casual,
            saleProducts: sale
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
        res.render('products/createProduct');
    },
    
    // Crea un artículo (POST)
    
    store: (req, res) => {
            db.Product.create({
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                color: req.body.color,
                size: req.body.size,
                category: req.body.category,
                type: req.body.type,
                description: req.body.description,
                image: req.files[0].filename
            })  
             return res.redirect('/producto/listado');
        },

    // Renderiza la vista Edición de artículo
    editForm: (req, res) => { 
        const products = helper.getAllProducts();
        const product = products.find(product => product.id == req.params.id);     
        res.render('products/editProduct', { product : product });       
    },

    // Edita un artículo (PUT)
    edit: (req, res) => {        
        const products = helper.getAllProducts();
        const editedProduct = products.map(function(product){
            if (product.id == req.params.id) {
                product.name=req.body.name; 
                product.type=req.body.type;
                product.category =req.body.category;
                product.size=req.body.size;
                product.color=req.body.color;
                product.description=req.body.description;
                product.image = req.files[0] ?  req.files[0].filename : product.image;
                product.price=req.body.price;
            } 
            return product
        })
        helper.writeProducts(editedProduct);
        res.redirect('/producto/'+ req.params.id);
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