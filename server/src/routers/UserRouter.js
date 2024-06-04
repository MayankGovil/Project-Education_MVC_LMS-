const express = require('express');
const { otpGenrate, createUser, logInUser } = require('../controllers/UserController');
// const { otpGenrate, createUser, logInUser } = require('../controllers/UserController');

const userRoutes = express.Router();

userRoutes.post('/genrateotp', otpGenrate);
userRoutes.post('/createuser', createUser);
userRoutes.post('/login', logInUser);

module.exports = userRoutes;