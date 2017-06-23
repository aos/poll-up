const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const pollController = require('../controllers/pollController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.render('layout');
})

/**
 * User Controllers
**/

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

// Password reset
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', 
  catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmPasswords,
  catchErrors(authController.update)
);

// User homepage
router.get('/user/:user', 
  authController.isLoggedIn,
  catchErrors(pollController.showUserPolls)
);

/**
 * Poll Controllers
**/

// Create a new poll
router.get('/new', 
  authController.isLoggedIn,
  pollController.newPoll);
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