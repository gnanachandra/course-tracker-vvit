const mongoose = require('mongoose');
const Student = require("../models/studentSchema");

const Course = new mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student"
    },
    platformName : {
        type : String,
        required : [true, "Provide Platform Name !"]
    },
    courseName : {
        type : String,
        required : [true, "Provide course name "]
    },
    enrolledIn : {
        type : String,
        required : [true, "Provide Enrolled Semestern !"]
    }
});

module.exports = new mongoose.model('Course',Course);