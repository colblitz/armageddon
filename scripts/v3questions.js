// 'node scripts/v3questions.js'

var mongoose = require('mongoose');
var async    = require('async');
var parse    = require('csv-parse');
var fs       = require('fs');

Question = require('../models/question');
Section  = require('../models/section');

mongoose.connect('mongodb://localhost:27017/armageddon');

const sections = [
  "Self Assessment", 
  "Hypotheticals", 
  "Core Values", 
  "Favorites", 
  "Relationships", 
  "This or That", 
  "Beliefs", 
  "Superlatives",
  "Life",
  "Categorization",
  "Desires",
  "Meta"
];

function saveSections(callback) {
  console.log("asdf");

  var s = async.queue(function(task, callback) {
    Section.find({ version: 3, section: task.section }, function(err, docs) {
      if (docs.length) {
        console.log("Section " + task.label + ": Already exists");
        callback();
      } else {
        var newSection = new Section();
        newSection.version = 3;
        newSection.section = task.section;
        newSection.label = task.label;
        newSection.save(function(err) {
          if (err) { callback(err); }
          console.log("Section " + task.label + ": Saved");
          callback();
        });
      }
    });
  }, 1);

  s.drain(() => {
    console.log("All sections have been saved");
    callback();
  });

  s.pause();


  sections.forEach(function (item, index) {
    s.push({label: item, section: index+1});
  });

  s.resume();
}

function saveQuestions(callback) {
  var q = async.queue(function(task, callback) {
    Question.find({ text: task.question.text }, function(err, docs) {
      if (docs.length) {
        console.log("Task " + task.name + ": Already exists");
        callback();
      } else {
        task.question.save(function(err) {
          if (err) {
            console.log("Error creating " + task.name);
            callback(err);
          }
          console.log("Task " + task.name + ": Saved");
          callback();
        });
      }
    });
  }, 1);

  q.drain(() => {
    console.log('All questions have been saved');
    callback();
  });

  q.pause();

  console.log("Reading from csv");
  fs.createReadStream('scripts/v3questions.csv')
    .pipe(parse({escape: '\\'}))
    .on('data', (row) => {
      // console.log("Got row: ", row);


      var newQuestion = new Question();
      newQuestion.version = 3;
      newQuestion.index = row[0];
      newQuestion.section = row[1];
      newQuestion.text = row[2];

      if (row[0] == 129) {
        newQuestion.link = "https://en.wikipedia.org/wiki/The_Five_Love_Languages";
      } else if (row[0] == 130) {
        newQuestion.image = "https://i.imgur.com/lJDaEA2.jpg";
      } else if (row[0] == 131) {
        newQuestion.image = "https://i.imgur.com/Z2pcemJ.jpg";
      } else if (row[0] == 132) {
        newQuestion.image = "https://i.imgur.com/RAm5IUq.jpg";
      }

      var taskName = 'Question' + row[0];
      q.push({name: taskName, question: newQuestion});
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      q.resume();
    });
}

var db = mongoose.connection;
db.once('open', function() {
  console.log("Connected");

  async.parallel([saveSections, saveQuestions], function() {
    console.log("Done saving sections and questions");
    console.log("Disconnecting from mongo");
    mongoose.disconnect();
  });
});