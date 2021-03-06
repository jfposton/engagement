var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var model = require('./model');
var compression = require('compression');
var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// enabling statistic tracking with DataDog
var dataDogOptions = {
    'response_code': true,
    'tags': ['toasttoposton']
};
var connectDatadog = require('connect-datadog')(dataDogOptions);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectDatadog);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(error, request, response) {
    response.status(error.status || 500);
    data = model('error');
    data.message = error.message;
    data.status = error.status;
    data.error = app.get('env') === 'development' ? error : {};
    response.render('error', data);
});

module.exports = app;
