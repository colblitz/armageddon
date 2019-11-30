var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Answer = new Schema({
  answerset: { type: Schema.Types.ObjectId, ref: 'AnswerSet'},
  question: { type: Schema.Types.ObjectId, ref: 'Question'},
  text: String,
});

module.exports = mongoose.model('Answer', Answer);