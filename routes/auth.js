const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.userLogin);
router.post('/register', authController.userRegister);

module.exports = router;
