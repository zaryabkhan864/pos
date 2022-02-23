const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController')
console.log('print 2')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router