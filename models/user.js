var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: {type: String, unique: true},
});

module.exports = mongoose.model('User', User);