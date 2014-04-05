
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
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
app.set('port', process.env.PORT || 3000);
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
// Schema 
// ------
// data structure and validation
// -----------------------------
var Schema = mongoose.Schema; 

var UserSpecificTweetSchema = new Schema({
  userID: Number,
  tweetID: Number,
  statusGood: String,
  statusBad: String,
  updatedDate: Date
});

var UserSchema = new Schema({
  username: String,
  firstName: String,
  email: String
});

var TweetSchema = new Schema({
  tweet: String,
  tweetURL: String,
  user: String,
  userURL: String,
  userDesc: String,
  type: String,
  postedDate: Date
});

// ------
// Models 
// ------
// choose database collection and apply a schema to it
// ---------------------------------------------------

var userSpecificTweetModel = mongoose.model('user-specific-tweet', UserSpecificTweetSchema);
var userModel = mongoose.model('user', UserSchema);
var tweetModel = mongoose.model('tweet', TweetSchema);

// ------
// Routes
// ------


app.get('/api', function(req, res) {
  res.send('API is running!');
});

//	USERS

app.get('/api/users', function(req, res) {

	userModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error user Get');
	  };
	});

});

//	USER SPECIFIC TWEETS

app.get('/api/userSpecificTweets', function(req, res) {

	userSpecificTweetModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error userSpecificTweet Get');
	  };
	});

});

app.get('/api/userSpecificTweets/:id', function(req, res) {

	userSpecificTweetModel.find({_id:id}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error userSpecificTweet Get');
	  };
	});

});

//	TWEETS

app.get('/api/tweets', function(req, res) {

	tweetModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error Tweet Get');
	  };
	});

});

app.post('/api/tweets', function (req, res){
  var tweet;
  console.log("POST: ");
  console.log(req.body);
  tweet = new tweetModel({
    tweet: req.body.tweet,
	  tweetURL: req.body.tweetURL,
	  user: req.body.user,
	  userURL: req.body.userURL,
	  userDesc: req.body.userDesc,
	  type: req.body.type,
	  postedDate: req.body.postedDate
  });
  tweet.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(tweet);
});

app.get('/', routes.index);
app.get('/users', user.list);

// -------------
// Launch Server
// -------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
