const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for each poll choice
const ChoiceSchema = new Schema({
  text: String,
  votes: {
    type: Number,
    default: 0
  }
});

// Schema for each poll, containing sub doc with choices
const PollSchema = new Schema({
  question: {
    type: String,
    required: 'Please supply a title'
  },
  author: String,
  date: {
    type: Date,
    default: Date.now
  },
  choices: [ChoiceSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
