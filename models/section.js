var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Section = new Schema({
  version: Number,
  section: {type: Number, default: 1},
  label: String
});

Section.index({ version: 1, section: 1}, { unique: true });

module.exports = mongoose.model('Section', Section);