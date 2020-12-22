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
    getAllUsers: () => {   
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
    }, //-> Obtiene todos los usuarios


    getNewUserId: () => {   
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
	    return users.pop().id++ + 1;     
    }, //-> Genera un nuevo Id de usuario


    writeUsers: (array) => {   
        const usersJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(usersFilePath, usersJson); 
    }, //-> Sobreescribe la database de Usuarios

    
    // PRODUCTOS
    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));        
    }, //-> Obtiene todos los productos

    
    getNewProductId: () => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	    return products.pop().id++ + 1;       
    }, //-> Genera un nuevo Id de producto

    
    writeProducts: (array) => {
        const productsJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(productsFilePath, productsJson);  
    }, //-> Sobreescribe la database de Productos


    // CARRITO
    getCartProducts: () => {
        return JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));        
    }, //-> Obtiene todos los productos del Carrito
    
    
    writeToCart: (array) => {
        const cartJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(cartFilePath, cartJson);  
    } //-> Sobreescribe la database de Carrito
}


//----------* EXPORTS CONTROLLER *----------//
module.exports = helper;