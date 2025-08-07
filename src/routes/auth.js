const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const validate=require("../utils/validation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
authRouter.post("/signup", async(req,res)=>{
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
});

authRouter.post("/login" ,async(req,res)=>{
  try{
  const {emailId,password}=req.body;
 
    const user= await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const passwordValid= await bcrypt.compare(password,user.password);
    if(passwordValid)
    {
      const token=await jwt.sign({_id:user._id},"Dev@Tinder$123",{expiresIn:"1d"});
      res.cookie("token",token);
      res.send("login successful");

    }
    else{
      throw new Error("invalid Credentials");
    }
    
  }catch(err){
    res.status(400).send(err.message)
  }
});

authRouter.post("/logout",async(req,res)=>{

  res.cookie("token",null,{
expires:new Date(Date.now())
})
res.send("u are logged out successfully");
})

module.exports=authRouter;