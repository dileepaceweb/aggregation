const express=require("express");
const router=express.Router();
const createSubject=require("../controllers/subjectController")

router.post("/createSubject",createSubject);

module.exports=router