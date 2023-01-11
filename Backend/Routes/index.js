import express from 'express';
const rootRouter = express.Router();
import authRouter from './auth.routes.js';



rootRouter.use('/auth', authRouter);









export default rootRouter;


