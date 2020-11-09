//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* FUNCTIONS *----------//
function getAllProducts() {    //-> Función que contiene a todos los productos
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}


//----------* PRODUCTS CONTROLLER *----------//
const productsController = {
    //Renderiza la vista Colección
    list: (req, res) => {        
        res.render('products/productsList');
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