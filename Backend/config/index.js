import dotenv from "dotenv";
dotenv.config();


const config = {
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
}

export default config;