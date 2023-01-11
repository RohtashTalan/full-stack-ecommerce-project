import express from 'express';
const Router = express.Router();
import { isLoggdIn } from '../middlewares/auth.middleware.js';


import { createCoupon, deactiveCoupon, deleteCoupon, getCoupons } from '../Controllers/coupons.controller.js';


Router.route('/add').post(isLoggdIn, createCoupon);
Router.route('/delete/:couponId').delete(isLoggdIn, deleteCoupon);
Router.route('/deactive/:couponId').put(isLoggdIn, deactiveCoupon);
Router.route('/').get(isLoggdIn, getCoupons);


export default Router;