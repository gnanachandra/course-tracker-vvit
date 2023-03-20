const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const Query = require("../models/QuerySchema");
const asyncHandler = require("express-async-handler");


const handleNewStudent = async(req,res) =>{
    const {name,rollNo,email,branch,section,AICTEStudentID,year,password} = req.body;
    if(!name || !rollNo || !email || !branch || !section || !AICTEStudentID || !year || !password)
    {
        return res.status(400).json({message : "Fill all the details !"});
    }
    else{
        const isRegistered = await Student.findOne({email})
        if(isRegistered){
            return res.status(409).json({message : "Student already registered !"});
        }
        else{
            const hashedPassword =await  bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            
            try{
                const newStudent = await Student.create(req.body);
                return res.status(200).json({message : "Student Enrolled !"});
            }
            catch(err){
                return res.status(500).json({message : err.message});
            }
        }
    }
}

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
      return res.status(400).json({message : "Enter all details !"});
    }
    const studentData = await Student.findOne({email});
    if(!studentData)
    {
      return res.status(404).json({message : "Student not registered !"});
    }
    const passwordValid = await bcrypt.compare(password,studentData['password']);
    if(passwordValid)
    {
      return res.status(200).json({message : "Login successfull !"});
    }
    return res.status(401).json({message : "Invalid credentials !"});
});


const addCourseController = async (req, res) => {

    if(!req.body.email || !req.body.platformName || !req.body.courseName || !req.body.enrolledIn)
    {
      return res.status(400).json({message : "Fill all the details !"})
    }
    //getting the data of the user logged in 
    const user = await Student.findOne({ email: req.body.email });
    if(!user)
    {
      return res.status(404).json({message : "Student not found !"});
    }
    //getting the courses in which the student is currently enrolled  in
    const courses = user['courses'];
    //a varaiable to know whether student requested for a duplicate enrollment
    let found = false;
    //checking for duplicate enrollment
    for (let i = 0; i < courses.length; i++) {
      const currentCourse = await Course.findOne({ _id: courses[i]._id });
      if (
        currentCourse.courseName === req.body.courseName &&
        currentCourse.platformName === req.body.platformName &&
        currentCourse.enrolledIn === req.body.enrolledIn) {
     
        found = true;
    
        break; // Exit the loop if course is found
      }
    }
  
    //if the course is found already in the students data sending response with status code 409 - conflict
    if (found) {
      return res.status(409).json({"status":"failed","message": "user already enrolled in the course","data":await user.populate('courses')});
    } else {
  
      //creating a new course document
      const newCourse = await Course.create(req.body);
      //storing the new course _id in the courses array which is an array of objectId's representing the document id's
      //of the courses that are enrolled by the student
      courses.push(newCourse._id);
      await user.save();
      //sending the response to the user with updated student data and response code 200
      return res.json({"status":"success","message": "user enrolled in the course","data":await user.populate('courses')});
    }
};

const submitQuery = asyncHandler(async(req,res)=>{
  if(!req.body.title || !req.body.description || !req.body.email)
  {
    return res.status(400).json({message : "Fill all the details !"})
  }
  const studentData = await Student.findOne({email : req.body.email});
  if(!studentData){
    return res.status(404).json({message : "Student Not Found !"});
  }
  else{
    try{
      const newQuery = await Query.create(req.body);
      const queries = studentData['queries'];
      queries.push(newQuery._id);
      studentData.save();
      return res.status(201).json({message : "Query Submitted !"});
    }
    catch(err)
    {
      return res.status(500).json({message : err.message});
    }
  }
})


module.exports = {login,handleNewStudent,addCourseController,submitQuery};