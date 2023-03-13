const mongoose = require('mongoose');

const Course = new mongoose.Schema({
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