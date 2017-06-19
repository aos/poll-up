const passport = require('passport');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = require('../models/User');

// Using a custom router (calling this from a separate controller)
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    // `req.login` must be used
    req.login(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', 'You are now logged in!');
      return res.redirect(`/user/${req.user.name}`)
    });
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out.');
  res.redirect('/');
}