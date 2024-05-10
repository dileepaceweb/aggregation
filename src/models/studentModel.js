const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"password filed is required"]
},
email:{
    type:String,
    required:[true,"password filed is required"]

},
password:{
    type:String,
    required:[true,"password filed is required"]
},
age:{
    type:Number,
    required:[true,"age field is required"]
},
address:[{
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
}],
subject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subject",
},
topic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Topic"
}

},{timestamps:true})

module.exports=mongoose.model("Student",studentSchema);
