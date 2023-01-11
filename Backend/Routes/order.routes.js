import express from 'express';
const Router = express.Router();
import { isLoggdIn } from '../middlewares/auth.middleware.js';



import { generateRazorpayOrderId } from '../Controllers/order.controller.js';

Router.route('/razorpay').post(isLoggdIn, generateRazorpayOrderId)


export default Router;