const Subject = require("../models/subjectModel");

const createSubject = async (req, res) => {
    try {
        const findSubject = await Subject.findOne({ topic: req.body.topic });

        if (findSubject) {
            return res.send({ message: "This subject already exists" });
        } else {
            // const subject = new Subject({ ...req.body });
            // const result = await subject.save();
            const data=req.body
            const result=await Subject.create(data)
            res.status(201).send({ message: "Subject successfully created", result });
        }

    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ message: "Internal server error", error });
    }
}

module.exports = createSubject;
