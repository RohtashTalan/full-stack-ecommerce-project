import express from 'express';
import { signUp } from '../Controllers/auth.controller';

const Router = express.Router();


Router.route('/signup').post(signUp);




export default Router;