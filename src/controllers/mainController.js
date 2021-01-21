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
		const models = await db.Model.findAll({
            include: ['category', 'color', 'image', 'type']
        });
        const productFound = models.filter(model => {
            return model.category.name.toLowerCase().includes(search) || model.name.toLowerCase().includes(search)|| model.color.name.toLowerCase().includes(search);
        });
		res.render('products/searchResults', {
            productFound: productFound,
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