var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
  version: Number,
  index: Number,
  section: {type: Number, default: 1},
  text: {type: String, unique: true},
  link: String,
  image: String
});

module.exports = mongoose.model('Question', Question);