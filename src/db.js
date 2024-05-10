const mongoose=require("mongoose");

const db=()=>{
  mongoose.connect(process.env.MongoUrl)
  try {
    console.log("MongoDb is Successfully Connected");
  } catch (error) {
    console.log("mMongodb connection failed",error)
  }
}

module.exports=db