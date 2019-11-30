var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSet = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  date: { type: Date, default: Date.now },
  version: Number
});

module.exports = mongoose.model('AnswerSet', AnswerSet);