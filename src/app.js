const express=require("express");
const connectDB = require("./config/database");
const User=require("./models/user");
const validate=require("./utils/validation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const app=express();
const cookieParser = require("cookie-parser");
const userAuthentication=require("./middlewares/auth");

connectDB().then(()=>{
    console.log("connection established successfully");
    app.listen(3000);
}).catch(err=>{
    console.error("couldn't connect to DB");
})
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async(req,res)=>{
  const{firstName,lastName,emailId,password}=req.body;
 
  try{
    validate(req);
    const passwordHash= await bcrypt.hash(password,10);
    const user=new User({firstName,lastName,emailId,password:passwordHash,});
  await user.save();
  res.send("user added successfully");
  }catch(err){
    res.status(400).send("error"+err.message);
  }
})
app.post("/login" ,async(req,res)=>{
  try{
  const {emailId,password}=req.body;
 
    const user= await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const passwordValid= await bcrypt.compare(password,user.password);
    if(passwordValid)
    {
      const token=await jwt.sign({_id:user._id},"Dev@Tinder$123");
      res.cookie("token",token);
      res.send("login successful");

    }
    else{
      throw new Error("invalid Credentials");
    }
    
  }catch(err){
    res.status(400).send(err.message)
  }
})
app.get("/profile",userAuthentication,async(req,res)=>{
  const user=req.user;
    res.send(user);
  
})
app.get("/feed",async(req,res)=>{
  
  try{
    const users= await User.find({});
    console.log(users);
    res.send(users);
    
  }catch(err){
    res.status(400).send("send wrong request");
  }
});
app.delete("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
  const user= await User.findByIdAndDelete(userId);
  res.send(user);
 }catch(err){
  res.status(400).send("send wrong request" + err.message);
 }
});
app.patch("/user/:userId", async(req,res)=>{
  const userId=req.params.userId;
  const data=req.body;
  const ALLOWED_UPDATES=["age","gender","firstName","lastName"];

  try{
    const isUpdateAllowed=Object.keys(data).every((k)=>
      ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
      throw new Error("update not allowed");
    }
    await User.findByIdAndUpdate(userId,data,{runValidators:true});
    res.send("user updated successfully");
  }catch(err){
    res.status(400).send("error"+err.message);
  }
})





