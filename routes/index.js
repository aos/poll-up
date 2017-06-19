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

// Create a new poll
router.get('/new', pollController.newPoll);

module.exports = router;