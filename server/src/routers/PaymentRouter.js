const express = require('express');
const paymentController = require('../controllers/PaymentController');
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentRouter = express.Router();

paymentRouter.post('/payment', paymentController);

module.exports = paymentRouter;