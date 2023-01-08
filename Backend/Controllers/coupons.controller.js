import Coupon from '../Model/coupon.schema.js';
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config/index.js";




/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
export const createCoupon = asyncHandler( async(req, res, next) => {
    const {code, discount} = req.body;
    
    if(!code || !discount){throw new CustomError("Both Field Required", 401)}

    const newCoupon = await Coupon.create({code, discount});

    res.status(200).json({
        success: true,
        newCoupon
    })

})

/**********************************************************
 * @DEACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/deactive/:couponId
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/
export const deactiveCoupon = asyncHandler( async(req, res, next) => {
    const {couponId} = req.params;
    
    if(!couponId){throw new CustomError("Coupon code Required", 401)}

    const deactive = await Coupon.findByIdAndUpdate({_id: couponId}, {active:false}, {new: true});

    res.status(200).json({
        success: true,
        deactive
    })

})

/**********************************************************
 * @DELETE_COUPON
 * @route https://localhost:5000/api/coupon/:couponId
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/

export const deleteCoupon = asyncHandler( async(req, res, next) => {
    const {couponId} = req.params;
    
    if(!couponId){throw new CustomError("Coupon code Required", 401)}

    const deletedCoupon = await Coupon.findByIdAndDelete({_id: couponId});

    if(!deletedCoupon){
        throw new CustomError("NO Coupon was found", 404)
    }

    res.status(200).json({
        success: true,
        deletedCoupon
    })

})


/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/

export const getCoupons = asyncHandler( async(req, res, next) => {
    

    const coupons = await Coupon.find({});

    
    if(!coupons){
        throw new CustomError("NO Coupon was found", 404)
    }

    res.status(200).json({
        success: true,
        coupons
    })

})