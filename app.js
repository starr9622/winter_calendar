var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/items');

var compileSass = require('express-compile-sass');

var app = express();
// app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);

app.use(compileSass({
  root: process.cwd(),
  sourceMap: true, // Includes Base64 encoded source maps in output css
  sourceComments: true, // Includes source comments in output css
  watchFiles: true, // Watches sass files and updates mtime on main files for each change
  logToConsole: false // If true, will log to console.error on errors
}));
app.use(express.static( process.cwd()));

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
