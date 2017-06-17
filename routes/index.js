const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.render('layout');
})

// Register a user
router.get('/register', userController.registerForm);
router.post('/register', 
  catchErrors(userController.validateRegister),
  /*catchErrors(userController.register)*/);

// Login a user
router.get('/login', userController.loginForm);

module.exports = router;