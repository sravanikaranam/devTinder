const mongoose = require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://namasteNode:RMn7IrYfukD915KZ@namastenode.im5mhqp.mongodb.net/devtinder");
};

module.exports=connectDB;