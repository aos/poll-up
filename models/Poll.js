const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for each voter
const voterSchema = new Schema({
  ip: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Schema for each poll choice
const ChoiceSchema = new Schema({
  text: {
    type: String,
    trim: true
  },
  votes: [voterSchema]
});

// Schema for each poll, containing sub doc with choices
const PollSchema = new Schema({
  question: {
    type: String,
    trim: true,
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
