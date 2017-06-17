const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/index');
require('dotenv').config({path: 'variables.env'});

const app = express();

// Connect to DB
mongoose.connect(process.env.DB);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files and body parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Validate data passed on `req.body`
app.use(expressValidator());

// Allows session storage
app.use(session({
  secret: process.env.SECRET,
  // Resaves a session on every connection
  resave: false,
  // If true, saves new but not modified sessions
  saveUninitialized: false,
  // Stores session on a mongoose connection
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Flash messages
app.use(flash());

app.use((req, res, next) => {
  // res.locals.h = helpers;
  res.locals.flashes = req.flash;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Handle routes
app.use('/', routes);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express server running on port ${server.address().port}...`);
});