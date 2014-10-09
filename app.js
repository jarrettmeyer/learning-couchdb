var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




/* initialize app */
var app = express();


/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/* uncomment after placing your favicon in /public */
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* configure URI mapping */
var routeConfig = require('./lib/RouteConfig')();
routeConfig.configureRoutes(app);


/* configure error handling */
var errorHandler = require('./lib/ErrorHandler')();
errorHandler.handleError(app);


module.exports = app;
