// Requerir las librerías Express y fs
const express = require('express');
const fs = require('fs');

// Declarar la app de Express y el puerto
const app = express();
const port = 3000;

// Levantar el servidor local
app.listen(port, () => {
    console.log('Servido corriendo en: http://localhost:3000/');
});

// Definir la carpeta 'public' como root
app.use(express.static('public'));

// Métodos GET para las páginas del sitio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/producto', (req, res) => {
    res.sendFile(__dirname + '/views/productDetail.html')
});

app.get('/carrito', (req, res) => {
    res.sendFile(__dirname + '/views/productCart.html')
});

app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});