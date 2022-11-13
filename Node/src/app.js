//Requires
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookies = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cors = require("cors")
// ************ express() - (don't touch) ************
const app = express(); 

// view engine setup NO TOCAR
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ************ Middlewares - Importados (don't touch) ************
app.use(logger('dev'));
app.use(express.json());

/*** Para que funcionen los form ***/
app.use(express.urlencoded({ 
  extended: false 
}));

app.use(cookies());

app.use(session({ 
  secret: 'ClarkKentEsSuperman',  
  resave: false, 
  saveUninitialized: false 
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride("_method"));

//ver lo que viaja por post en req.body de un form 
app.use(express.urlencoded({ 
  extended: false 
}))

//MiddleWare Creados
app.use(userLoggedMiddleware);


//para poder usar las apis
app.use(cors())


//rutas
const indexRouter = require('./routes/indexRoute');
const productsRouter = require('./routes/productsRoute');
const usersRouter = require('./routes/usersRoute');
const cartRouter = require('./routes/cartRoute')

//rutas API
const apiProductsRouter = require('./routes/api/apiProductsRoute');
const apiUsersRouter = require('./routes/api/apiUsersRoute');
//linkS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

// links apis
app.use("/api/v1/products", apiProductsRouter);
app.use("/api/v1/users", apiUsersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.status == 404){
    res.status(404).render("not-found")
  }else{
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;

