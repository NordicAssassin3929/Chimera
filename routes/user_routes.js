const express = require('express');
const userController = require('../controllers/user_controller');

const router = express.Router();

// to do
router.get('/login', userController.getUser);

// to do
router.post('/register', userController.createUser);

module.exports = router;