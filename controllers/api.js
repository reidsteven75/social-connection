/*
 * API controller
 */

// ****************************
// 				  Models
// ****************************

var tweetModel = require('../models/tweet.js');
var userModel = require('../models/user.js');
var userSpecificTweetModel = require('../models/userSpecificTweet.js');


// ****************************
// 					  API
// ****************************

// ------
//	USERS
// ------

exports.userList = function(req, res){


	userModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error user Get');
	  };
	});


};

// ------
// TWEETS
// ------

exports.tweetList = function(req, res){


	tweetModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error tweet Get');
	  };
	});


};

exports.tweetSave = function(req, res){

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

};

// -------------
// TWEETS / USER
// -------------

exports.userSpecificTweetList = function(req, res){


	userSpecificTweetModel.find({}).exec(function(err, result) {
	  if (!err) {
	    res.send(result);
	  } else {
	    console.log('error tweet specific user Get');
	  };
	});


};