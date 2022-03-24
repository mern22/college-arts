var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { connect, get } = require("./config/connection") ;

// connect((err) => {
//    err ? console.log("Database error :" ,err) : console.log("Database connected successfully") ;
// })

//Defining Routers of diffrent users

var studentRouter = require('./routes/student');
var superadminRouter = require('./routes/superadmin');
var artsclubRouter = require("./routes/artsclub");
var judgesRouter = require("./routes/judges") ;
var organiserRouter = require("./routes/organiser");


var hbs = require("express-handlebars") ;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers of difrent users

app.use('/', studentRouter);
app.use('/superadmin', superadminRouter);
app.use("/artsclub",artsclubRouter) ;
app.use("/judges",judgesRouter) ;
app.use("/organiser",organiserRouter) ;


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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
