const app = require("./app");
// import config from "./config/index";

const PORT =  4000;


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})