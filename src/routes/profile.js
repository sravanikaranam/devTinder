const express=require("express");
const profileRouter=express.Router();
const userAuthentication=require("../middlewares/auth");
const validateProfile=require("./utils/validation")
profileRouter.get("/profile/view",userAuthentication,async(req,res)=>{
  const user=req.user;
    res.send(user);
})

profileRouter.patch("/profile/edit",userAuthentication,async(req,res)=>{
  try{ 
    if(!validateProfile){
        throw new Error("ur profile is not valid");
      }
      const user=req.user;
      Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
      res.send("edit was successful");
  }catch(err){
    res.status(400).send("err.message");
  }

})

module.exports=profileRouter;