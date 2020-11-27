//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../data/users.json');
const productsFilePath = path.join(__dirname, '../data/products.json');
const cartFilePath = path.join(__dirname, '../data/cart.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* FUNCTIONS *----------//
const helper = {
    // USUARIOS
    // Obtiene todos los usuarios
    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
    },

    // Genera un nuevo Id de usuario
    getNewUserId: () => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
	    return users.pop().id++ + 1;     
    },

    // Sobreescribe la database de Usuarios
    writeUsers: (array) => {
        const usersJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(usersFilePath, usersJson); 
    },

    // PRODUCTOS
    // Obtiene todos los productos
    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));        
    },

    // Genera un nuevo Id de producto
    getNewProductId: () => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	    return products.pop().id++ + 1;       
    },

    // Sobreescribe la database de Productos
    writeProducts: (array) => {
        const productsJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(productsFilePath, productsJson);  
    },

    // CARRITO
    // Obtiene todos los productos del Carrito
    getCartProducts: () => {
        return JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));        
    },
    
    // Sobreescribe la database de Carrito
    writeToCart: (array) => {
        const cartJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(cartFilePath, cartJson);  
    }
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helper;