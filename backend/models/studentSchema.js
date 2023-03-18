const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true,"provide studentName"],
    },
    rollNo :{
        type:String,
        required : [true,"provide rollNo"],
        unique :true
    },
    email:{
        type:String,
        required : [true,"provide email"],
    },
    branch:{
        type:String,
        enum : ['CSE','IT','ECE','EEE','CSM','AID','IOT','CIC','MECH','CIVIL'],
        required : [true,"provide branch"],
    },
    section :{
        type:String,
        required : [true,"provide section"],
    },
    AICTEStudentID :{
        type:String,
        required:[true,"provide AICTE ID "],
        unique :true
    },
    year :{
        type:String,
        required:[true,"provide year"]
    },
    password :{
        type:String,
        required:[true,"provide Password"] 
    },
    courses : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    queries : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Query'
    }],
    role:{
        type:String,
        default : "Student"
    }
},{timestamps:true})

module.exports = mongoose.model("Student",studentSchema);