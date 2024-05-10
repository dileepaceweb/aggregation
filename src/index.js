const express=require("express");
const app=express();
const dotenv=require("dotenv")
const db=require("./db")
dotenv.config()
const studentRoute=require("./routes/studentRoute");
const subjectRoute=require("./routes/subjectRoute");
const topicRoute=require("./routes/topicRoute")
//middleware to parse json bodies of request
app.use(express.json())

//connection to database
db();

 app.use("/",studentRoute);
app.use("/",subjectRoute);
app.use("/",topicRoute);
app.listen(process.env.PORT||500,()=>{
    console.log("Server is listening Port no:",process.env.PORT)
})



