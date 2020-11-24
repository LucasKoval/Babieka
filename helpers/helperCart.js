//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/products.json');
const cartFilePath = path.join(__dirname, '../data/cart.json');


//----------* FUNCTIONS *----------//
const helperProducts = {
    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));        
    },
    getNewId: () => {
        const products = getAllProducts();
	    return products.pop().id + 1;       
    },
    writeToCart: (array) => {
        const cartJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(cartFilePath, cartJson);  
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helperProducts;