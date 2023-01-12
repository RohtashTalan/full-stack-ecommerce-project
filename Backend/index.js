import app from "./app.js";
import mongoose from "mongoose";
import config  from "./config/index.js";



//create a fn
// run a fn
// (async () => {})()
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log("DB Connected");

        app.on('error', (err)=>{
            console.log("ERROR", err);
            throw err;
        })
        const onListening = () => {
                console.log(`Server running at http://localhost:${config.PORT}`);
        }
        app.listen(config.PORT, onListening)


    } catch (err) {
        console.log("Error ", err);
        throw err
    }
})()

