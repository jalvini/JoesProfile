/*const https = require("https"),
    fs = require("fs");

const options = {
    key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
    cert: fs.readFileSync("/srv/www/keys/chain.pem")
};


https.createServer(options, app).listen(8080);
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

// Router Const's
const indexRouter = require('./routes/index');
const downloadRouter = require('./routes/download');

// Parser
const myParser = require("body-parser");

const hbs = require( 'express-handlebars' );
const app = express();


app.engine( 'hbs', hbs( {
    extname: 'hbs',
    partialsDir: __dirname + '/views/includes/'
} ) );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(myParser.urlencoded({extended : true}));

// Routers
app.use('/', indexRouter);
app.use('/download', downloadRouter);


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
