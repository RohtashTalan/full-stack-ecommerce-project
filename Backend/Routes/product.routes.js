import express from 'express';
const Router = express.Router();
import { isLoggdIn } from '../middlewares/auth.middleware.js';


import { addProduct, getAllProducts, getProductById } from '../Controllers/product.controller.js';



Router.route('/add').post(isLoggdIn, addProduct);
Router.route('/single').post(isLoggdIn, getProductById);

Router.route('/').get(getAllProducts);


export default Router;