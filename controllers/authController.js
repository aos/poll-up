const passport = require('passport');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const User = require('../models/User');

// Using a custom router (calling this from a separate controller)
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    // `req.login` must be used
    req.login(user, (err) => {
      if (err) return next(err);
      req.flash('success', 'You are now logged in!');
      return res.redirect(`/user/${req.user.name}`)
    });
  })(req, res, next);
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('danger', 'You must be logged in.');
  return res.redirect('/login');
}

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out.');
  return res.redirect('/');
}

exports.forgot = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    req.flash('danger', 'No user with that email exists.')
    return res.redirect('/login');
  }
  
  // Set reset token and expiration
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // Expires 1 hour from now
  await user.save();
  const resetURL = `${req.protocol}://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  req.flash('success', `Click <a href=${resetURL} class="alert-link">here</a> to reset your password.`)
  return res.redirect('/login');
}

exports.reset = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    // Ensure that the token is still valid (within the 1 hour)
    resetPasswordExpires: { $gt: Date.now() } 
  })
  if (!user) {
    req.flash('danger', 'Password reset token is invalid or expired.');
    return res.redirect('/login');
  }
  return res.render('reset', {title: 'Reset your password'});
}

exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    return next();
  }
  req.flash('danger', 'Passwords do not match.')
  return res.redirect('back');
}

exports.update = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('danger', 'Password reset token is invalid or expired.');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  const updateUser = await user.save();
  await req.login(updateUser, (err) => {
    if (err) return next(err); 
    req.flash('success', 'Your password has been reset. You are now logged in!');
    return res.redirect(`/`);
  });
}