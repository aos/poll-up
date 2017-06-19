const mongoose = require('mongoose');
const User = require('../models/User');
const Poll = require('../models/Poll');

exports.newPoll = (req, res) => {
  if (req.user) {
    res.render('new', {title: 'New poll'})
  }
  else {
    req.flash('danger', 'You must be logged in to create a poll!')
    res.redirect('/');
  }
}

exports.createPoll = async (req, res, next) => {
  // Create new poll using question
  const poll = new Poll({
    question: req.body.question,
    author: req.user.name
  });
  // Loop through req.body options and assign each one as an option in the poll
  req.body.options.forEach((choice) => {
    // Parse out blank choices
    if (choice) {
      poll.choices.push({text: choice})
    }
  })
  await poll.save();
  res.json(poll);
}