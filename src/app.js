const express=require("express");
const app=express();
app.listen(3000);
app.use("/test/print",(req,res)=>{
   
    res.send("subportal inside subportal");
});
app.use("/test",(req,res)=>{
    
    res.send("hello this is my server's first subportal");
});
app.use((req,res)=>{
    
    res.send("hello this is my first server")
});



