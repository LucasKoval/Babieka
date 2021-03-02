//----------* GLOBAL REQUIRE'S *----------//
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override');
const cors = require('cors');

//----------* MIDDLEWARES REQUIRE *----------//
const setAutoLog = require('./middlewares/setAutoLog');   //-> Si se marca Recuerdame, pone en session al usuario de la cookie
const setLocals = require('./middlewares/setLocals');     //-> Guarda en locals la info del usuario en session
const authMW = require('./middlewares/authMW');           //-> Controla que el usuario esté logueado

//----------* EXPRESS() *----------//
const app = express();

//----------* MIDDLEWARES *----------//
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret: 'Babieka',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(setAutoLog);
app.use(setLocals);

//----------* VIEW ENGINE SETUP *----------//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//----------* ROUTES REQUIRE *----------//
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const apiRouter = require('./routes/api/api');

//----------* ROUTES USE() *----------//
app.use('/', mainRouter);                 //-> Home y rutas globales
app.use('/usuario', usersRouter);         //-> Rutas de Usuarios
app.use('/producto', productsRouter);     //-> Rutas de Productos
app.use('/carrito',authMW, cartRouter);   //-> Rutas del Carrito
app.use('/api', cors(), apiRouter);       //-> Rutas de APIs


//----------* CATCH 404 *----------//
app.use((req, res, next) => next(createError(404)));

//----------* ERROR HANDLER *----------//
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

//----------* EXPORTS APP *----------//
module.exports = app;