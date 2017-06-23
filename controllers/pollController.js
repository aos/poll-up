const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/User');
const Poll = require('../models/Poll');
const helpers = require('../helpers');

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
  const pollURL = `${req.protocol}://${req.headers.host}/poll/${poll._id}`
  req.flash('success', `Your poll was created! Use <a href=${pollURL} class="alert-link">this link</a> to share your poll.`);
  res.redirect(`/poll/${poll._id}`)
}

exports.showPoll = async (req, res, next) => {
  const userVotedPromise = Poll.findOne({_id: req.params.id, 'choices.votes.ip': helpers.getIP(req) });
  const pollPromise = Poll.findOne({_id: req.params.id});
  const [poll, userVoted] = await Promise.all([pollPromise, userVotedPromise]);

  if (userVoted) {
    req.flash('warning', 'You already voted!');
    return res.render('result', {poll: JSON.stringify(poll), flashes: req.flash()});
  }
  return res.render('viewPoll', {poll});
}

exports.showAll = async (req, res, next) => {
  const polls = await Poll.find().sort({date: -1});
  res.locals.polls = polls;
  res.render('all', {polls, moment});
}

exports.showUserPolls = async (req, res, next) => {
  const polls = await Poll.find({author: req.params.user}).sort({date: -1});
  res.render('userHome', {polls, moment});
}

exports.vote = async (req, res, next) => {
  // Pull choice
  let choice = req.body.optionsRadios;
  const userVotedPromise = Poll.findOne({_id: req.params.id, 'choices.votes.ip': helpers.getIP(req) });
  const pollPromise = Poll.findOne({_id: req.params.id});
  const [userVoted, poll] = await Promise.all([userVotedPromise, pollPromise]);

  res.locals.poll = poll;
  // Check if user has voted already
  if (userVoted) {
    req.flash('warning', 'You already voted!');
    return next();
  }
  // Cast vote
  poll.choices[choice].votes.push({ip: helpers.getIP(req)});
  await poll.save();
  req.flash('success', 'Thanks for voting!');
  return next();
}

exports.showResult = async (req, res, next) => {
  if (res.locals.poll) {
    let poll = res.locals.poll;
    return res.render('result', {poll: JSON.stringify(poll), flashes: req.flash()});
  }
  let poll = await Poll.findOne({_id: req.params.id});
  return res.render('result', {poll: JSON.stringify(poll), flashes: req.flash()});
}

exports.delete = async (req, res, next) => {
  let deleted = await Poll.deleteOne({_id: req.params.id});
  let user = req.user.name;
  req.flash('success', 'Deleted poll.');
  res.redirect(`/user/${user}`);
}