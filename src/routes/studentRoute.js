const express=require("express");
const {registerStudent,fetchedDetails} = require("../controllers/studentController");
const router=express.Router();

router.post("/register",registerStudent);
router.get("/fetched",fetchedDetails);


module.exports=router;