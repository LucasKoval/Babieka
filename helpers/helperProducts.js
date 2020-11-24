//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/products.json');


//----------* FUNCTIONS *----------//
const helperProducts = {
    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));        
    },
    getNewId: () => {
        const products = getAllProducts();
	    return products.pop().id + 1;       
    },
    writeProducts: (array) => {
        const productsJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(productsFilePath, productsJson);  
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helperProducts;