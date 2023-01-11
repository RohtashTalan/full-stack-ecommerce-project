import express from 'express';
import { forgotPassword, getProfile, login, logout, resetPassword, signUp, updatePassword } from '../Controllers/auth.controller';
import { isLoggdIn } from '../middlewares/auth.middleware';

const Router = express.Router();


Router.route('/signup').post(signUp);
Router.route('/login').post(login);
Router.route('/logout').get(logout);

Router.route('/password/forgot').post(forgotPassword);
Router.route('/reset/:resetPasswordToken').get(resetPassword);

Router.route('/password/update').post(isLoggdIn, updatePassword);
Router.route('/profile').get(isLoggdIn, getProfile);




export default Router;