import User from '../Model/user.model';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import mongoose from 'mongoose';

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //could be in a separate file in utils
}

/***********************************
 * @SignUp
 * @ROUTE  http://localhost:5000/api/auth/SIGNUP
 * @DESCRIPTION user SIGNUP Controller
 * @PARAMETER
 * @RETURNS USER OBJECT
 * 
 */


export const signUp = asyncHandler (async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new CustomError('Please fill all fields', 400)
    }

    // check if user exists
    const existingUser = await User.findOne({email})

    if(existingUser) {
        throw err
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = User.getJwtToken();
    console.log(user);
    user.password = undefined;


    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success: true,
        token,
        user
    })


})


/***********************************
 * @LOGIN
 * @ROUTE  http://localhost:5000/api/auth/login
 * @DESCRIPTION user signIn Controller
 * @PARAMETER
 * @RETURNS
 * 
 */


export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
})