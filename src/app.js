const express=require("express");
const connectDB = require("./config/database");
const app=express();
const cookieParser = require("cookie-parser");

connectDB().then(()=>{
    console.log("connection established successfully");
    app.listen(3000);
}).catch(err=>{
    console.error("couldn't connect to DB");
})

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
app.use("/",authRouter);
app.use("/",profileRouter);






