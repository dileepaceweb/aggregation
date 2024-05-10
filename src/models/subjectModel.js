const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic" 
    }
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
