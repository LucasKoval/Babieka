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
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	    return products.pop().id++ + 1;       
    },
    writeProducts: (product) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	    const productToSave = [...products, product];
        const productsJson = JSON.stringify(productToSave, null, " ");
	    fs.writeFileSync(productsFilePath, productsJson);  
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helperProducts;