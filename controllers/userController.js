const mongoose = require('mongoose');
const User = require('../models/User');
const promisify = require('es6-promisify');

exports.registerForm = (req, res) => {
  return res.render('register', {title: 'Register'});
}

exports.loginForm = (req, res) => {
  return res.render('login', {title: 'Login'});
}

exports.validateRegister = async (req, res, next) => {
  req.checkBody({
    'name': {
      notEmpty: true,
      errorMessage: 'You must supply a username.'
    },
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid email address.'
      }
    },
    'password': {
      notEmpty: true,
      errorMessage: 'You must supply a password.'
    },
    'password-confirm': {
      notEmpty: true,
      matches: {
        options: [new RegExp(`^${req.body.password}$`)]
      },
      errorMessage: 'Passwords do not match.'
    }
  })
  req.sanitizeBody('name').trim();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  })
  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    const mapped = errors.array().map(e => e.msg);
    req.flash('danger', mapped);
    return res.render('register', {title: 'Register', body: req.body, flashes: req.flash()});
  }
  else {
    next();
  }
}

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });
  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
  next();
}

exports.homePage = async (req, res, next) => {
  const user = await User.findOne({name: req.params.user})
  res.locals.user = user;
  next();
}