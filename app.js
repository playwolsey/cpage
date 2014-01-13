/**
 * Module dependencies.
 */
var express = require('express')
//  , routes = require('./lib')
  , http = require('http')
  , mime = require('mime')
  , path = require('path');

var config = require('./config');

var app = express();

mime.define({
  'application/x-javascript': ['js']
});

// init views, replace express's view system
var views = require('./lib/views');

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.listen(config.listen);
console.log('Express server listening on port ' + config.listen + ' in ' + app.settings.env + ' mode');

require('./lib/all').route(app);
