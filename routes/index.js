const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const pollController = require('../controllers/pollController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.render('layout');
})

// Register a user
router.get('/register', userController.registerForm);
router.post('/register', 
  catchErrors(userController.validateRegister),
  catchErrors(userController.register),
  authController.login
);

// Login a user
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

// Logout a user
router.get('/logout', authController.logout);

// User homepage
router.get('/user/:user', 
  catchErrors(pollController.showUserPolls)
);

// Create a new poll
router.get('/new', pollController.newPoll);
router.post('/new', 
  catchErrors(pollController.createPoll), 
  catchErrors(pollController.showPoll)
);

// View/vote on poll
router.get('/poll/:id', catchErrors(pollController.showPoll));
router.post('/poll/:id/vote', pollController.vote);

// View ALL the polls
router.get('/all', catchErrors(pollController.showAll));

module.exports = router;