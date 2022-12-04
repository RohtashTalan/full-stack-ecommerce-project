import express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser())

// morgan logger
app.use(morgan('tiny'))




module.exports=app;