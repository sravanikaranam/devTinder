const validator=require("validator");

const validate=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

        if(firstName.length==0||lastName.lenth==0){
            throw new Error ("firstName and lastName are required fields");
        }
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid credentials");
        }
        if(! validator.isStrongPassword(password)){
            throw new Error("Invalid credentials");
        }
}
module.exports=validate;