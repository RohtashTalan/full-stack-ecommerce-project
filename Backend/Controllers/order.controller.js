import Product from "../Model/product.schema.js";
import Coupon from "../Model/coupon.schema.js";
import Order from "../Model/order.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import razorpay from "../config/razorpay.config.js";







/**********************************************************
 * @GENEARATE_RAZORPAY_ID
 * @route https://localhost:5000/api/order/razorpay
 * @description Controller used for genrating razorpay Id
 * @description Creates a Razorpay Id which is used for placing order
 * @returns Order Object with "Razorpay order id generated successfully"
 *********************************************************/

export const generateRazorpayOrderId = asyncHandler( async (req, res) => {

    /**Capture info from frontend
     * products shoud have productId, count
     * phone Number should be in number
     */
    const {products, couponCode, address, phoneNumber} = req.body;
    const userId = req.user._id;

    //capture product price from backend
     
    const prices = await Product.find({ 
        "_id" : {
            "$in" : 
              ["63ca26e0505996ae353b3530", 
               "63ca26e0505996ae353b3531"
              ]
           }
    });



    let totalAmount = 0 ;
    //total amount and final amount
    prices.map((item) => (totalAmount += item.price ))
    // coupon check - DB
    const discount = await Coupon.find({code: couponCode});
    // disount
    let finalAmount = totalAmount - discount

    const options = {
        amount: Math.round(finalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`
    }

    const order = await razorpay.orders.create(options)

    //if order does not exist
    // success then, send it to front end
})