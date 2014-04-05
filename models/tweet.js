/*
 * Tweet model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  tweet: String,
  tweetURL: String,
  user: String,
  userURL: String,
  userDesc: String,
  type: String,
  postedDate: Date
});

module.exports = mongoose.model('tweet', tweetSchema);