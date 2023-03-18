const mongoose = require("mongoose");

const CourseCatalog = new mongoose.Schema({
    platformName : {
        type:String,
        required : [true,"Provide course platform Name !"]
    },
    courses :[
        {
            type : String,
            unique : true,
            default : []
        }
    ]
},{
    timestamps : true
});

module.exports = new mongoose.model('Catalog',CourseCatalog,'catalog');
