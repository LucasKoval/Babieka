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


//----------* MAIN CONTROLLER *----------//
const mainController = {
    //Renderiza Homepage
    index: (req, res) => {        
        res.render('index');
    },
    // Rsnderiza Resultado de busqueda
    search: (req, res) => {
        res.render('products/searchResults');
		// obtener la info del formulario.
		// filtrar en la base de datos
		// almacenar en una variable
		// renderizar la vista
        /*
        const buscar = req.query.keywords;
		const productos = getAllProducts();
		const productoEncontrado = productos.filter(producto => producto.name.toLowerCase().includes(buscar));
		res.render('searchResults', {productoEncontrado : productoEncontrado});
        */
	},
    //Renderiza Nosotros
    aboutUs: (req, res) => {        
        res.render('main/aboutUs');
    },
    //Renderiza Como comprar
    howToBuy: (req, res) => {        
        res.render('main/howToBuy');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = mainController;