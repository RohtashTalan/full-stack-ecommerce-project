import express from 'express';
const rootRouter = express.Router();


import authRouter from './auth.routes.js'; 
import collectionRouter from './collection.routes.js';
import productRouter from './product.routes.js';
import orderRouter from './order.routes.js';
import couponRouter from './coupons.routes.js';



rootRouter.use('/auth', authRouter);
rootRouter.use('/collection', collectionRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/order', orderRouter);
rootRouter.use('/coupon', couponRouter);








export default rootRouter;


