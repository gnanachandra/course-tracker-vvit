const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const Query = require("../models/QuerySchema");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");


const handleNewStudent = asyncHandler(async (req, res) => {
  const { name, rollNo, email, branch, section, AICTEStudentID, year, password } = req.body;
  if (!name || !rollNo || !email || !branch || !section || !AICTEStudentID || !year || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Fill all the details !" });
  }
  const isRegistered = await Student.findOne({ email });
  if (isRegistered) {
    return res.status(StatusCodes.CONFLICT).json({ message: "Student already registered !" });
  }
  try {
    const newStudent = await Student.create(req.body);
    return res.status(StatusCodes.OK).json({ message: "Student Enrolled !" });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});


const login = asyncHandler(async (req, res) => {
  try { 
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Enter all details!" });
    }
    const studentData = await Student.findOne({ email });
    if (!studentData) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Student not registered!" });
    }
    const passwordValid = await bcrypt.compare(password, studentData.password);
    if (passwordValid) {
      const token = studentData.createJWT();
      return res.status(StatusCodes.OK).json({ message: "Login successful!", token });
    }
    return res.status(401).json({ message: "Invalid credentials!" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});


const addCourseController = asyncHandler(async (req, res) => {
  const studentId = req.userId;
  const { platformName, courseName, enrolledIn } = req.body;

  try {
    // Check if all fields are present in request body
    if (!platformName || !courseName || !enrolledIn) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide all details!" });
    }

    // Find the student by their ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Student not found!" });
    }

    // Check if student is already enrolled in the course
    const isEnrolled = await Course.findOne({
      platformName,
      courseName,
      enrolledIn,
      student: studentId,
    });

    if (isEnrolled) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Student already enrolled in the course" });
    }

    // Create the new course and save it to the database
    const newCourse = new Course({
      platformName,
      courseName,
      enrolledIn,
      student: studentId,
    });
    await newCourse.save();

    // Add the course to the student's list of courses and save the changes
    student.courses.push(newCourse._id);
    await student.save();

    return res.status(StatusCodes.OK).json({
      message: "Course added successfully",
      data: await student.populate("courses"),
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
});


const submitQuery = asyncHandler(async(req,res)=>{
  if(!req.body.title || !req.body.description || !req.body.email)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({message : "Fill all the details !"})
  }
  const studentData = await Student.findOne({email : req.body.email});
  if(!studentData){
    return res.status(StatusCodes.NOT_FOUND).json({message : "Student Not Found !"});
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
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
  }
})


module.exports = {login,handleNewStudent,addCourseController,submitQuery};