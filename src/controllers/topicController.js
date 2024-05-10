const Topic=require("../models/topicModel");

const createTopic=async(req,res)=>{
    try {
        const data=req.body;
        const saved=await Topic.create(data);
        res.status(201).send({message:"  Topic  Successfully created",saved});
    } catch (error) {
        console.log("Error",error);
        res.status(500).send({message:"Internal server Error",error})
    }
}

module.exports=createTopic