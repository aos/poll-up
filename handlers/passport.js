const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

// Sets up a local strategy
// This is used so that it is possible to set the username field as 'email' instead of 'username'
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());