const mongoose = require("mongoose");

const Platform = new mongoose.Schema({
    platformName : {
        type:String,
        required : [true,"Provide course platform Name !"]
    },
    courses :[
        {
            type : String,
            required : [true, "Provide course name !"],
            unique : true
        }
    ]
});

module.exports = new mongoose.model('PlatformCourses',Platform);
