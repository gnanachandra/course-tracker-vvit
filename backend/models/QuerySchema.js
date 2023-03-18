const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,"Provide title !"]
    },
    description : {
        type : String,
        required : [true, "Provide Description"]
    },
    active : {
        type : Boolean,
        default : true
    },
    photo : {
        type : "String"
    } 
});

module.exports = new mongoose.model("Query",QuerySchema);