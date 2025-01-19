
const mongoose=require("mongoose");
const connectDB=async()=>{
  //mongoose.connect will return a promise
  await mongoose.connect(process.env.DB_CONNECT);
}

module.exports=connectDB;
  