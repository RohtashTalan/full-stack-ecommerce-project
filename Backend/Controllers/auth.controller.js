import User from '../Model/user.model.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/customError.js';
import mongoose from 'mongoose';
import mailHelper from '../utils/mailHelper.js';
import crypto from 'crypto';
import exp from 'constants';

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //could be in a separate file in utils
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/
 export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }
    //check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError('User already exists', 400)  
    }

    const user = await User.create({
        name,
        email,
        password
    });
    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ( !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        throw new CustomError('Invalid credentials', 400)
    }


    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError('Invalid credentials - pass', 400)

})


/******************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/auth/logout
 * @description User logout bby clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/
export const logout = asyncHandler(async (_req, res) => {
    // res.clearCookie()
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:5000/api/auth/password/forgot
 * @description User will submit email and we will generate a token
 * @parameters  email
 * @returns success message - email send
 ******************************************************/

 export const forgotPassword = asyncHandler(async (req, res) => {

    const {email} = req.body;

    // check email for null or ''

   const user = await User.findOne({email});

   if(!user) {
    throw new CustomError('User not Found', 404)
   }

   const resetToken = await user.generateForgotPasswordToken();

   await user.save({validateBeforSave: false});

   const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`
   
   const text = ` Your password rest url is  \n\n ${resetUrl} \n\n`;

   try {
    await mailHelper({
        email: user.email,
        subject: "Password Reset email for website",
        text: text,
    })

    res.status(200).json({
        success: true,
        message : `Email send to ${user.email}`
        })
   } catch (err) {
    // roll back - clear fields and save
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({validateBeforSave: false})

    throw new CustomError(err.message || 'Email sent failure', 500)

   }


})


/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:5000/api/auth/reset/:resetPasswordToken
 * @description User will able to reset password based on url token
 * @parameters  token from url, password and confirmPasword
 * @returns user object
 ******************************************************/


export const resetPassword = asyncHandler(async (req, res)=>{
    const {token: resetToken} = req.params;
    const {password, confirmPassword} = req.body;

    console.log(resetToken, password, confirmPassword);

   const resetPasswordToken =  crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    const user = await User.findOne({
        forgotPasswordToken:resetPasswordToken,
        forgotPasswordExpiry:{$gt : Date.now()}
    })

    if(!user){
        throw new CustomError('password token is invalid or expired', 400)
    }

    if(password !== confirmPassword){
        throw new CustomError('password and confirmPassword doesnot matched', 400)
    }

    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    // create token and send as response
    const token = user.getJwtToken();
    user.password = undefined

// send object to user
    res.cookie("token",token, cookieOptions);
    res.status(200).json({
        success: true,
        message: "password reset successfull",
        user
    })


})


// Todo: create a controller for change password

/******************************************************
 * @UPDATE_PASSWORD
 * @route http://localhost:5000/api/auth/password/update
 * @description User will able to update password based only if he is login (middleware will check wheter user is loggedIn or not)
 * @parameters  userid from req.user body will be inserted by route, oldPassword and newPassword
 * @returns user object
 ******************************************************/

export const updatePassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new CustomError("Both new and old password requried", 400)
    }

    // req.user will be inserted by middleware in route file
    const user = await User.findById(req.user.id);

    user.password = newPassword;
    user.save();

    // send message to frontend
    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })

})



/******************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE
 * @route http://localhost:5000/api/auth/profile
 * @description check for token and populate req.user
 * @parameters  
 * @returns user object
 ******************************************************/

export const getProfile = asyncHandler(async(req, res) => {
    const {user} = req;
    if(!user){
        throw new CustomError('User not found', 404)
    }
        res.status(200).json({
            success:true,
            user
        })
    
})


