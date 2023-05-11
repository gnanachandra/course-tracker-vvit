const Student = require("../models/StudentSchema");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const Query = require("../models/QuerySchema");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Catalog = require("../models/CourseCatalog");
/*

CREATE - handlenewstudent, add course handler, submit query
READ - login,get profile
UPDATE - update query,update profile,update password
DELETE - delete student, delete platform, delete course,delete query

*/

//CREATE

//add new student
const handleNewStudent = asyncHandler(async (req, res) => {
  const {
    name,
    rollNo,
    email,
    branch,
    section,
    AICTEStudentID,
    year,
    password,
  } = req.body;
  if (
    !name ||
    !rollNo ||
    !email ||
    !branch ||
    !section ||
    !AICTEStudentID ||
    !year ||
    !password
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Fill all the details !" });
  }
  const isRegistered = await Student.findOne({ email });
  if (isRegistered) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Student already registered !" });
  }
  try {
    const newStudent = await Student.create(req.body);
    const token = await newStudent.createJWT();
    return res.status(StatusCodes.OK).json({ message: "Student Enrolled !" ,user : newStudent, token : token});
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//add course
const addCourseController = asyncHandler(async (req, res) => {
  const studentId = req.userId;
  const platformName = req.body.platform;
  const courseName = req.body.course;
  const enrolledIn = req.body.semester;

  try {
    // Check if all fields are present in request body
    if (!platformName || !courseName || !enrolledIn) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all details!" });
    }

    // Find the student by their ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Student not found!" });
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
    return res.status(StatusCodes.OK).json({
      message: "Course saved successfully",
      data: await student.populate({ path: "courses" }),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
});

//submit query
const submitQuery = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const studentId = req.userId;
  if (!title || !description || !studentId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Fill all the details !" });
  }
  try {
    const newQuery = await Query.create({
      title,
      description,
      student: studentId,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "New query submitted !" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//READ

//login
const login = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Enter all details!" });
    }
    const studentData = await Student.findOne({ email }).populate([
      "courses queries",
    ]);
    console.log(studentData);
    if (!studentData) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Student not registered!" });
    }

    const passwordValid = await bcrypt.compare(password, studentData.password);
    if (passwordValid) {
      const token = studentData.createJWT();
      return res
        .status(StatusCodes.OK)
        .json({ message: "Login successful!", token, data: studentData });
    }
    return res.status(401).json({ message: "Invalid credentials!" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

//view profile
const getmyProfile = asyncHandler(async (req, res, next) => {
  const id = req.userId;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "student id not received !" });
  }
  try {
    const studentData = await Student.findById(id).populate([
      "courses",
      "queries",
    ]);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Student Data Sent !", data: studentData });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//get catalog data
const getCatalogData = asyncHandler(async(req,res) => {
  try{
      const data = await Catalog.find({}).select(["platformName",'courses']);
      return res.status(StatusCodes.OK).json({message : "catalog sent",data});
  }
  catch(err)
  {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
  }
});

//get enrolled courses
const getEnrolledCourses = asyncHandler(async(req,res)=>{
  if(!req.userId)
  {
    return res.status(StatusCodes.BAD_REQUEST).json({message : "Something went wrong"});
  }
  try{
    const data = await Course.find({student:req.userId});
    return res.status(StatusCodes.OK).json({message : "Enrolled Courses sent",data});
  }
  catch(err)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
  }
})

//UPDATE

//update course
const updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const updatedData = req.body;
  if (Object.keys(updatedData).length === 0) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "No change in details !" });
  }
  if (!courseId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Course Id is missing !" });
  }
  const courseData = await Course.findById(courseId);
  if (!courseData) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Course not found !" });
  }
  try {
    const response = await Course.findByIdAndUpdate(courseId, updatedData, {
      runValidators: true,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Course details updated !", data: response });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//update profile
const updateProfile = asyncHandler(async (req, res, next) => {
  const updatedData = req.body;
  if (Object.keys(updatedData).length === 0) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "no change in details !" });
  }
  const user = await Student.findById(req.userId);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "user not found !" });
  }
  try {
    const response = await Student.findByIdAndUpdate(req.userId, updatedData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    const updatedUser = await Student.findById(req.userId);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Profile Updated !", updatedData: updatedUser });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//update password
const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill all details" });
  }
  const student = await Student.findById(req.userId);
  const isPasswordMatched = await student.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid Credentials !" });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Password and Confirm Password must be same !" });
  }
  if (oldPassword === newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "New Password must be different from Old Password" });
  }
  student.password = newPassword;
  await student.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: "password updated", updatedData: student });
});

//DELETE

//delete course
const deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "course id not received !" });
  }
  const courseData = await Course.findById(courseId);
  if (!courseData) {
    return res.status(404).json({ message: "Course not found !" });
  }
  try {
    const response = await Course.findOneAndDelete({ _id: courseId });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Course deleted !", data: response });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

module.exports = {
  handleNewStudent,
  addCourseController,
  submitQuery,
  login,
  getmyProfile,
  getCatalogData,
  getEnrolledCourses, 
  updateProfile,
  updatePassword,
  updateCourse,
  deleteCourse,
};
