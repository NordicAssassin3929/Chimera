const express = require('express');
const userController = require('../controllers/user_controller');

const router = express.Router();

// done
router.get('/login/:email', userController.getUser);

// done
router.post('/register', userController.createUser);

module.exports = router;