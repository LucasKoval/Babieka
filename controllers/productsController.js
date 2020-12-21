//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');

//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    // Renderiza la vista Colección
    list: (req, res) => {
        const products = helper.getAllProducts();
		const fiesta = products.filter((product) => {
			return product.category == 'Fiesta';
		});
		const casual = products.filter((product) => {
			return product.category == 'Casual';
        });
		res.render('products/productsList', {
			fiestaProducts: fiesta,
			casualProducts: casual
		});        
    },

    // Renderiza la vista Sale
    sale: (req, res) => {        
        const products = helper.getAllProducts();
        const sale = products.filter((product) => {
			return product.category == 'Sale';
		});
		res.render('products/productsSale', {
			saleProducts: sale
		});  
    },

    // Renderiza la vista Listado de Productos
    productsFullList: (req, res) => {
        const products = helper.getAllProducts();
		const fiesta = products.filter((product) => {
			return product.category == 'Fiesta';
		});
		const casual = products.filter((product) => {
			return product.category == 'Casual';
        });
        const sale = products.filter((product) => {
			return product.category == 'Sale';
		});
		res.render('products/productsFullList', {
			fiestaProducts: fiesta,
            casualProducts: casual,
            saleProducts: sale
		});        
    },

    // Renderiza la vista Detalle de producto
    detail: (req, res) => {   
        const products = helper.getAllProducts();
        const product = products.find(product => product.id == req.params.id);     
        res.render('products/productDetail', { product : product });
    },

    // Agrega un articulo al Carrito
    add: (req, res) => {
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
        const products = helper.getAllProducts();
        const product = {
            id: helper.getNewProductId(),
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            color: req.body.color,
            size: req.body.size,
            category: req.body.category,
            type: req.body.type,
            description: req.body.description,
            image: req.files[0].filename
        }
        const productToSave = [...products, product];
        helper.writeProducts(productToSave);
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
    delete: (req, res) => {        
        const products = helper.getAllProducts();
        const remainingProducts = products.filter((product) => {
			return product.id != req.params.id;
        });
        helper.writeProducts(remainingProducts);
        return res.redirect('/producto/listado');
    }
};

//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;