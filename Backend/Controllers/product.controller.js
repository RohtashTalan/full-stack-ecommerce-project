import Product from "../Model/product.schema.js";
import formidable from "formidable";
import fs from "fs";
import {s3FileDelete, s3FileUpload} from "../services/imageUploader.js";
import Mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config/index.js";



/*****************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************************************************************/

export const addProduct = asyncHandler(async (req, res) => {
     const form = formidable({
        multiples: true,
        keepExtensions: true
     });


     form.parse(req, async function(err, fields, files){
        try {
            // if error throw error
            if(err){throw new CustomError(err.message || "Something went Wrong", 500)}

            let productId = new Mongoose.Types.ObjectId().toHexString();

            // console.log(fields, files, form, productId);


            // check for fields
            if(!fields.name || 
                !fields.price ||
                !fields.description ||
                !fields.collectionId 
                ) {
                    throw new CustomError("Please fill all details", 500)
                }
            
            // handling images
            let imgArrayResponse = Promise.all(
                Object.keys(files).map(async (filekey, index) => {
                    const element = files[filekey];

                    const data = fs.readFileSync(element.filepath);

                    const upload = await s3FileUpload({
                      bucketName: config.S3_BUCKET_NAME,
                      key: `Products/${productId}/photo_${index+1}`,
                      body: data,
                      contentType: element.mimetype,
                    });

                    return {
                        secure_url: upload.Location
                    }

                })
            )

            let imgArray = await imgArrayResponse;

            const product = await Product.create({
                _id: productId,
                photos: imgArray,
                ...fields,
            })


            if (!product) {
                throw new CustomError("Product was not created", 400)
            }

            res.status(200).json({
                success: true,
                product
            })
            
        } catch (error) {
        
            return res.status(500).json({
                success: false,
                message: error.message || "Something went wrong"
            })
        }
     })
})