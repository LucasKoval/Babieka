//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


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
        res.render('products/productsList');
    },
    //Renderiza la vista Edición de artículo
    sale: (req, res) => {        
        res.render('products/productsSale');
    },
    //Renderiza la vista Detalle de producto
    detail: (req, res) => {        
        res.render('products/productDetail');
    },
    //Renderiza la vista Carrito
    cart: (req, res) => {        
        res.render('products/productCart');
    },
    //Renderiza la vista Nuevo artículo
    create: (req, res) => {        
        res.render('products/createProduct');
    },
    //Renderiza la vista Edición de artículo
    edit: (req, res) => {        
        res.render('products/editProduct');
    },
    //Elimina el registro de un artículo
    delete: (req, res) => {        
        //código
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = productsController;