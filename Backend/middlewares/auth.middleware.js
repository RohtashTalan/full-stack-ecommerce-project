import User from '../Model/user.model.js';
import  JWT, { JsonWebTokenError }  from 'jsonwebtoken';
import CustomError from '../utils/customError.js';
import asyncHandler from '../services/asyncHandler.js';
import config from '../config/index.js';




export const isLoggdIn = asyncHandler(async (req, _res, next) => {
    let token;

    if(
        req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ){
        token = req.cookies.token || req.headers.authorization.split(' ')[1]
    }

    if(!token){
        throw new CustomError("Not authorized to access this route", 401)
    }

    try {
      const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
      // _id, find user based on id, set this in req.user

    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();

    } catch (err) {
        throw new CustomError("Not authorized to access this route", 401)
    }
})