const express = require('express')
const router = express.Router();

const usersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', usersController.user_signup);
router.delete('/:userId', checkAuth, usersController.user_delete);
router.post('/login', usersController.user_login);

module.exports = router;