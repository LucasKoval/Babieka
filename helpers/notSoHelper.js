//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const usersDB = path.join(__dirname, '../data/users.json');
const productsDB = path.join(__dirname, '../data/products.json');
const cartDB = path.join(__dirname, '../data/cart.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* FUNCTIONS *----------//
const notSoHelper = {
    // Obtiene todos los elementos de una DB
    getAllItems: (arrayDB) => {
        return JSON.parse(fs.readFileSync(arrayDB, 'utf-8'));
    },

    // Genera un nuevo ID
    getNewId: (arrayDB) => {
        const array = JSON.parse(fs.readFileSync(arrayDB, 'utf-8'));
	    return array.pop().id++ + 1;     
    },

    // Sobreescribe la database de Usuarios
    writeItems: (arrayDB) => {
        const arrayJson = JSON.stringify(arrayDB, null, " ");
	    fs.writeFileSync(arrayDB, arrayJson);
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = notSoHelper;