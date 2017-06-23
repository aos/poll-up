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

// Delete a poll
router.get('/poll/:id/delete', 
  catchErrors(pollController.delete),
  catchErrors(pollController.showUserPolls));

// View/vote on poll
router.get('/poll/:id', catchErrors(pollController.showPoll));
router.post('/poll/:id/vote', 
  catchErrors(pollController.vote),
  pollController.showResult
);

// View ALL the polls
router.get('/all', catchErrors(pollController.showAll));

// View poll results
router.get('/poll/:id/result', catchErrors(pollController.showResult));

module.exports = router;