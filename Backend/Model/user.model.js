import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles';
import { Jwt } from "jsonwebtoken";
import config from "../config";
import crypto from "crypto";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[30,"Max Length for First Name is 30 Characters"]
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email Already Registered With Us"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Minimum 8 Characters Password Needed"],
        select:false
    },
    role:{
        type:String,
        enum:Object.keys(AuthRoles),
        default:AuthRoles.USER
    },
    forgotPasswordToken:{type:String},
    forgotPasswordExpiry:{type:Date}
},
{timestamps: true}
)


// encrypted password hook
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password,10);
    next();
})



// add more feature
userSchema.methods = {
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },
    getJwtToken: function () {
        return Jwt.sign({
            _id: this._id,
            role: this.role
        },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },
    generateForgotPasswordToken: function() {
        const forgotToken = crypto.randomBytes(20).toString('hex');

        // step 1 - save to DB
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex");

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

        // step 2 - return values to user
        return forgotToken;
    }
}

export default mongoose.model(User,userSchema);



