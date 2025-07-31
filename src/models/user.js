const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        minLenght:2,
        maxLength:20,
        required:true,
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:20,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid");
            }
        }
    },
    age:{type:Number,
        min:18,
    },
    password:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong");
            }
        }
    },
    
        gender:{
        type:String,
        enum:["male","female","other"]  
        }
}
,{timestamps:true});
const User=mongoose.model("user",userSchema);
module.exports=User;