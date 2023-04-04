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

const submitQuery = asyncHandler(async(req,res,next)=>{
  const {title,description} = req.body;
  const studentId = req.userId;
  if(!title || !description || !studentId)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({message : "Fill all the details !"});
  }
  try{
    const newQuery = await Query.create({title,description,student : studentId});
    return res.status(StatusCodes.OK).json({message : "New query submitted !"});
  }
  catch(err)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
  }
});

const updateCourse = asyncHandler(async(req,res,next)=>{
  const courseId = req.params.courseId;
  const updatedData = req.body;
  if(!courseId)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({message : "Course Id is missing !"});
  }
  const courseData = await Course.findById(courseId);
  if(!courseData)
  {
    return res.status(StatusCodes.NOT_FOUND).json({message : "Course not found !"});
  }
  try{
    const response = await Course.findByIdAndUpdate(courseId,updatedData);
    return res.status(StatusCodes.OK).json({message : "Course details updated !"});
  }
  catch(err)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message,updatedData : response});
  }
});

const deleteCourse = asyncHandler(async(req,res,next)=>{
  const courseId = req.params.courseId;
  if(!courseId)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({message : "course id not received !"});
  }
  const courseData = await Course.findById(courseId);
  if(!courseData)
  {
    return res.status(404).json({message : "Course not found !"});
  }
  try{
    const response = await Course.findOneAndDelete({courseId});
    return res.status(StatusCodes.OK).json({message : "Course deleted !"});
  }
  catch(err)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
  }
});

const updateProfile = asyncHandler(async(req,res,next)=>{
  const updatedData = req.body;
  if(!updatedData)
  {
    return res.status(StatusCodes.OK).json({message : "no change in details !"});
  }
  const user = await Student.findById(req.userId);
  if(!user)
  {
    return res.status(StatusCodes.NOT_FOUND).json({message : "user not found !"});
  }
  try{
    const response = await Student.findByIdAndUpdate(req.userId,updatedData,{
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(StatusCodes.OK).json({message : "Profile Updated !",updatedData : response});
  }
  catch(err)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
  }
});

const updatePassword = asyncHandler(async(req,res,next)=>{
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: "Please fill all details"});
  }
  const student = await Student.findById(req.userId);
  const isPasswordMatched = await student.confirmPassword(oldPassword);
  if (!isPasswordMatched) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
  }
  if (newPassword !== confirmPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Password and Confirm Password must be same !"});
  }
  if (oldPassword === newPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message:"New Password must be different from Old Password"});
  }
  student.password = newPassword;
  await student.save();
  return res.status(StatusCodes.OK).json({ message: "password updated",updatedData : student});
})
module.exports = {login,handleNewStudent,addCourseController,submitQuery,updateProfile,deleteCourse,updateCourse};