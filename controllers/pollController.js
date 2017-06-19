const mongoose = require('mongoose');
const User = require('../models/User');
const Poll = require('../models/Poll');

exports.newPoll = (req, res) => {
  res.render('new', {title: 'New poll'})
}