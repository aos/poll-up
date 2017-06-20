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
  res.redirect(`/poll/${poll._id}`)
}

exports.showPoll = async (req, res, next) => {
  if (res.locals.poll) {
    console.log(res.locals.poll)
    return res.json(res.locals.poll);
  }
  const poll = await Poll.findOne({_id: req.params.id});
  return res.render('viewPoll', {poll});
}

exports.showAll = async (req, res, next) => {
  const polls = await Poll.find();
  // if (req.user &&)
  res.locals.polls = polls;
  res.render('all', {polls});
}

exports.showUserPolls = async (req, res, next) => {
  const polls = await Poll.find({author: req.params.user})
  res.render('userHome', {polls});
}

exports.vote = async (req, res, next) => {
  let choice = req.body.optionsRadios;
  const poll = await Poll.findOne({_id: req.params.id})
  poll.choices[choice].votes.push({ip: req.ip.replace(/^:[a-fA-F0-9]*:*[a-fA-F0-9]*:/g, "")})
  await poll.save();
  res.json(poll);
}