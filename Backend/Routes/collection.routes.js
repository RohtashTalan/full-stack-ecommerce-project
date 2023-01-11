import express from 'express';
const Router = express.Router();
import { isLoggdIn } from '../middlewares/auth.middleware.js';

import { createCollection, deleteCollection, updateCollection, getAllCollections } from '../Controllers/collection.controller.js';


Router.route('/create').post(isLoggdIn, createCollection);
Router.route('/update/:collectionId').put(isLoggdIn, updateCollection);
Router.route('/delete/:collectionId').delete(isLoggdIn, deleteCollection);

Router.route('/').get(isLoggdIn, getAllCollections);




export default Router;