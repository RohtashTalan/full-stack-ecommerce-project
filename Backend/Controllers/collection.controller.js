import Collection  from '../Model/collection.schema';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const createCollection = asyncHandler(async (req, res) => {
    // name from frontend
    const {name} = req.body;
    if(!name) {
        throw new CustomError("Collection name is required", 400);
    }

    // add this name to database
    const collection = await Collection.create({name})

    // send this response value to frontend
    res.status(200).json({
        success: true,
        message: "Collection created with success",
        collection

    })
})

