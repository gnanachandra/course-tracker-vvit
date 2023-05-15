const mongoose = require('mongoose');
const Student = require("../models/StudentSchema");

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
    },
    certificateLink : {
        type : String,
    }
});

module.exports = new mongoose.model('Course',Course);