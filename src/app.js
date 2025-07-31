const express=require("express");
const connectDB = require("./config/database");
const User=require("./models/user");
const app=express();
connectDB().then(()=>{
    console.log("connection established successfully");
    app.listen(3000);
}).catch(err=>{
    console.error("couldn't connect to DB");
})
app.use(express.json());
app.post("/signup", async(req,res)=>{
  
  const user=new User(req.body);
  try{
  await user.save();
  res.send("user added successfully");
  }catch(err){
    res.status(400).send("error"+err.message);
  }
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





