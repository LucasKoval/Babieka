//----------* REQUIRE'S *----------//


//----------* MAIN CONTROLLER *----------//
const mainController = {
    //Renderiza Homepage
    index: (req, res) => {        
        res.render('index');
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