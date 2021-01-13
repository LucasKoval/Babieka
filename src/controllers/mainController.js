//----------* REQUIRE'S *----------//
const db = require('../db/models');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const mainController = {
    // Renderiza la Homepage
    index: (req, res) => {        
        res.render('index');
    },

    // Renderiza Resultado de busqueda
    search: async (req, res) => {
        const search = req.query.search.toLowerCase();
		const products = await db.Product.findAll({
            include: ['category', 'color', 'description', 'discount', 'image', 'model', 'size', 'type']
        });
        const productFound = products.filter(product => {
            return product.model.name.toLowerCase().includes(search) && product.size.number == 35;
        });
		res.render('products/searchResults', {
            productFound: productFound
		});
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