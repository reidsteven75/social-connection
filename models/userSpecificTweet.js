/*
 * User Specific Tweet model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSpecificTweetSchema = new Schema({
  userID: Number,
  tweetID: Number,
  statusGood: String,
  statusBad: String,
  updatedDate: Date
});

module.exports = mongoose.model('user-specific-tweet', userSpecificTweetSchema);