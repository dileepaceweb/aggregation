const express=require("express");
const router=express.Router();
const createTopic=require("../controllers/topicController")

router.post("/createTopic",createTopic);

module.exports=router