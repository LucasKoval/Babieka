//----------* REQUIRE'S *----------//
const db = require('../db/models');
const usersResource = require('../requests/usersResource');
const productsResource = require('../requests/productsResource');

//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const mainController = {
    // Renderiza la Homepage
    index: (req, res, next) => {    
        /* usersResource.list().then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.results); 
        }) */
        res.render('index');
    },

    // Renderiza Resultado de busqueda
    search: async (req, res) => {
        const search = req.query.search.toLowerCase();
		const products = await db.Product.findAll({
            include: [{
                all: true,
                nested: true
            }],
            order: [
                ['id']
            ],
            group: ['model.id']
        });
        const productFound = products.filter(product => {
            return product.model.category.name.toLowerCase().includes(search) || product.model.name.toLowerCase().includes(search) || product.model.color.name.toLowerCase().includes(search);
        });
		res.render('products/searchResults', { productFound	});
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