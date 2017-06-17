const mongoose = require('mongoose');
// const User = mongoose.model('User');

exports.registerForm = (req, res) => {
  return res.render('register', {title: 'Register'});
}

exports.loginForm = (req, res) => {
  return res.render('login', {title: 'Login'});
}