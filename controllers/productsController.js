//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/products.json');


//----------* FUNCTIONS *----------//
function getAllProducts() {    //-> Función que contiene a todos los productos
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function getNewId(){
	const products = getAllProducts();
	return products.pop().id + 1;
}

function writeProducts(array) {
	const productsJson = JSON.stringify(array, null, " ");
	fs.writeFileSync(productsFilePath, productsJson);
}



//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    //Renderiza la vista Colección
    list: (req, res) => {
        const products = getAllProducts();
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
        const products = getAllProducts();
        const sale = products.filter((product) => {
			return product.category == 'Sale';
		});

		res.render('products/productsSale', {
			saleProducts: sale
		});  
    },

    
    //Renderiza la vista Detalle de producto
    detail: (req, res) => {   
        let productos = getAllProducts();
        let producto = productos.find(elemento => elemento.id == req.params.id);     
        res.render('products/productDetail', { producto : producto });
    },

    
    //Renderiza la vista Carrito
    cart: (req, res) => {        
        res.render('products/productCart');
    },
    

    //Renderiza la vista Nuevo artículo
    createForm: (req, res) => {        
        res.render('products/createProduct');
    },


    //Crear Nuevo artículo
    store: (req, res) => {        
        res.render('products/createProduct');
    },


    //Renderiza la vista Edición de artículo
    editForm: (req, res) => { 
        let productos = getAllProducts();
        let producto = productos.find(elemento => elemento.id == req.params.id);     
        res.render('products/editProduct', { producto : producto });       
    },


    //Editar artículo (PUT)
    edit: (req, res) => {        
        let productos = getAllProducts();
        const productoEditado = productos.map(function(producto){
            if (producto.id == req.params.id) {
                producto.name=req.body.name;
                producto.type=req.body.type;
                producto.size=req.body.size;
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

    //Elimina el registro de un artículo
    delete: (req, res) => {        
        //obtener el producto del id del req
        //Obtener todod los productos de la DB
        //Comparar para encontrar el que coincide 
        //Eliminar el producto que machea con el de la DB
        //qué devuelve la página? redirect o render?, mensaje prompt? 
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;