import express from 'express';
const Router = express.Router();
import { isLoggdIn } from '../middlewares/auth.middleware.js';


import { forgotPassword, getProfile, login, logout, resetPassword, signUp, updatePassword } from '../Controllers/auth.controller.js';


Router.route('/signup').post(signUp);
Router.route('/login').post(login);
Router.route('/logout').get(logout);

Router.route('/password/forgot').post(forgotPassword);
Router.route('/password/reset/:token').post(resetPassword);

Router.route('/password/update').post(isLoggdIn, updatePassword);
Router.route('/profile').get(isLoggdIn, getProfile);




export default Router;