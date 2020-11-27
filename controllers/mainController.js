//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');

//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const mainController = {
    // Renderiza Homepage
    index: (req, res) => {        
        res.render('index');
    },

    // Renderiza Resultado de busqueda
    search: (req, res) => {
        res.render('products/searchResults');
		// obtener la info del formulario.
		// filtrar en la base de datos
		// almacenar en una variable
		// renderizar la vista
        /*
        const search = req.query.keywords;
		const products = helper.getAllProducts();
		const productFound = products.filter(product => product.name.toLowerCase().includes(search));
		res.render('searchResults', {productFound : productFound});
        */
    },
    
    // Renderiza Nosotros
    aboutUs: (req, res) => {        
        res.render('main/aboutUs');
    },

    // Renderiza Como comprar
    howToBuy: (req, res) => {        
        res.render('main/howToBuy');
    }
};

//----------* EXPORTS CONTROLLER *----------//
module.exports = mainController;