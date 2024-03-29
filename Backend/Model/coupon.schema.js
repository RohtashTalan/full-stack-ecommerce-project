import mongoose from "mongoose";


const couponSchema = mongoose.Schema(
    {
        code:{
            type:String,
            required: [true, 'Please provide a coupan name'],
            unique: [true, "This Coupon is already exists"]
        },
        discount: {
            type:Number,
            default:0
        },
        active:{
            type: Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)


export default mongoose.model("Coupon", couponSchema);