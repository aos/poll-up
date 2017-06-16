const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('flash');
const path = require('path');
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

// Flash messages
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash;
//   res.locals.user = req.user || null;
//   next();
// });

// Handle routes
app.use('/', routes);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express server running on port ${server.address().port}...`);
});