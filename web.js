
/**
 * Module dependencies.
 */

var express = require('express');
var api = require('./controllers/api.js');

var logfmt = require('logfmt'); // Heroku dependancy
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

// --------
// Database
// --------

mongoose.connect('mongodb://reidsteven75:IronMaiden75@ds039737.mongolab.com:39737/social-connection-app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB CONNECTION ESTABLISHED");
});

// ------
// Config
// ------

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ------
// Routes
// ------

app.get('/api', function(req, res) {
  res.send('API is running!');
});

app.get('/api/users', api.userList);
app.get('/api/tweets', api.tweetList);
app.get('/api/userSpecificTweets', api.userSpecificTweetList);


// -------------
// Launch Server
// -------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
