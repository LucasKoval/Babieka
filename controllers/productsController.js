//----------* REQUIRE'S *----------//
const helperProducts = require('../helpers/helperProducts');

//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    //Renderiza la vista Colección
    list: (req, res) => {
        const products = helperProducts.getAllProducts();
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


    //Renderiza la vista Sale
    sale: (req, res) => {        
        const products = helperProducts.getAllProducts();
        const sale = products.filter((product) => {
			return product.category == 'Sale';
		});

		res.render('products/productsSale', {
			saleProducts: sale
		});  
    },


    //Renderiza la vista Detalle de producto
    detail: (req, res) => {   
        let productos = helperProducts.getAllProducts();
        let producto = productos.find(elemento => elemento.id == req.params.id);     
        res.render('products/productDetail', { producto : producto });
    },


    //Renderiza la vista Carrito
    cart: (req, res) => {       
        const products = helperProducts.getAllProducts();
		const fiesta = products.filter((product) => {
			return product.category == 'Fiesta';
		});
		res.render('products/productCart', {
			fiestaProducts: fiesta,
		}); 
    },


    //Renderiza la vista Nuevo artículo
    createForm: (req, res) => {        
        res.render('products/createProduct');
    },
    
    //Editar artículo (POST)
    create: (req, res) => {        
        let productos = getAllProducts();
        const productoEditado = productos.map(function(producto){
            let product = {
                producto.id == req.params.id) 
            producto.name=req.body.name; 
            producto.type=req.body.type;
            producto.size=req.body.size;
            producto.category =req.body.category;
            producto.color=req.body.color;
            producto.description=req.body.description;
            //producto.image=req.body.image;
            producto.price=req.body.price;
            }
            
            
            return producto
        })
        
        writeProducts(productoEditado);
        res.redirect('/producto/'+ req.params.id);
    },
    

    //Crear Nuevo artículo
    store: (req, res) => {        
        res.render('products/createProduct');
    },


    //Renderiza la vista Edición de artículo
    editForm: (req, res) => { 
        let productos = helperProducts.getAllProducts();
        let producto = productos.find(elemento => elemento.id == req.params.id);     
        res.render('products/editProduct', { producto : producto });       
    },


    //Editar artículo (PUT)
    edit: (req, res) => {        
        let productos = helperProducts.getAllProducts();
        const productoEditado = productos.map(function(producto){
            if (producto.id == req.params.id) {
                producto.name=req.body.name; 
                producto.type=req.body.type;
                producto.category =req.body.category;
                producto.size=req.body.size;
                producto.color=req.body.color;
                producto.description=req.body.description;
                //producto.image=req.body.image;
                producto.price=req.body.price;
            } 
            return producto
        })

        helperProducts.writeProducts(productoEditado);
        res.redirect('/producto/'+ req.params.id);
    },


    //Elimina el registro de un artículo
    delete: (req, res) => {        
        console.log(req.params.id);
        const products = helperProducts.getAllProducts();
        console.log(products);
        const remainingProducts = products.filter((product) => {
			return product.id !== req.params.id;
        });
        console.log(remainingProducts);
        helperProducts.writeProducts(remainingProducts);
        return res.redirect('/');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;