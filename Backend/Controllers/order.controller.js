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
     * productArray shoud have productId, count
     * phone Number should be in number
     */
    const {productArray, couponCode, address, phoneNumber} = req.body;
    const userId = req.user._id;

    // make query as variable
    let productQuery = [];
    productArray.map((item) => (
        productQuery.push(item.productId)
    ));


    
    //capture product price from backend
    const products = await Product.find({ "_id" : { "$in" : productQuery}});


    let totalAmount = 0 ;
    let newProductArray= [];

    //total amount and final amount

    // push product along with count to the new product array
    products.map((item) => {
       
        productArray.map((count)=>{
            let newItem = {
                _id: item._id,
                name: item.name,
                price: item.price,
                description: item.description,
                thumbnail: item.photos[-1],
                colectionId: item.colectionId,
            }
            if(item._id == count.productId){
                newItem.count = count.count;
                totalAmount += (item.price)*(count.count);
                newProductArray.push(newItem);
            }

    })
     })

     let finalAmount = totalAmount;
    // // coupon check - DB
    if(couponCode){
        const discount = await Coupon.find({code: couponCode});
         finalAmount = totalAmount - discount.discount;
}

    // // disount
    

    const options = {
        amount: Math.round(finalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`
    }

    // const order = await razorpay.orders.create(options)

    //if order does not exist
    // success then, send it to front end
})