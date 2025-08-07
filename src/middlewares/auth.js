const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuthentication= async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new  Error("invalid token");
        }
        const decodedMessage=await jwt.verify(token,"Dev@Tinder$123");
        const {_id}=decodedMessage;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("invalid user");
        }
        req.user=user;
       
        next();
    }catch(err){
        res.status(400).send(err.message);
    }

}
module.exports=userAuthentication;

