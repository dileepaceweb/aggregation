const registerStudent = async (req, res) => {
  try {
    // const data=req.body;
    // const{name,email,phone,password,age,address}=data
    // const saved=await Student.create(data);
    const student = new Student({ ...req.body });
    const savedData = await student.save();
    res
      .status(201)
      .send({ message: " Student Registration Successfully", savedData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Internal server Error", error });
  }
};

const Student = require("../models/studentModel");
const fetchedDetails = async (req, res) => {
  try {
    //========= Using populate ===========
    // const data = await Student.find()
    //   .populate("topic", "-_id name")//id is exclude
    //   .populate("subject", " -_id title"); // id is exclude

    //=========using Aggregation==========
    const data = await Student.aggregate([
      {
         //$match: {age:{$gte:20}},
        //  $group:{_id:"$age"},
        //$group:{_id:"address.city"}
        //$match:{age:144}
        //$and:[{gender:"female"},{age:{$gt:25}}]}
        //$match:{$and:[{name:"dileep"},{age:{$gte:25}}]}
        $match:{name:"dileep"},
       
        $group:{_id:{name:"$name",age:"$age",address:"$address.city"}}

        //  $sort:{name:-1}
      },
    ]);
    res.status(200).send({ message: "Successfully Fetched Data", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "internal server Error:", error });
  }
};

module.exports = { registerStudent, fetchedDetails };
