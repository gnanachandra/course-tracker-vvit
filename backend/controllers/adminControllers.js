const Catalog = require("../models/CourseCatalog");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const { Query } = require("mongoose");

//admin login

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide email and password" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
    const token = admin.createJWT();
    const adminData = await Admin.findById(admin._id).select("-password");
    res.status(StatusCodes.OK).json({ adminData, token });
});


//add admin
const addAdmin = asyncHandler(async(req, res, next) => {
    const { name, email, password} = req.body;
    if ( !name || !email || !password ) {
      return res.status(StatusCodes.BAD_REQUEST).json({message: "Please fill all details"});
    }
    const isAdmin = await Admin.findOne({ email });
    if(isAdmin) {
      return res.status(StatusCodes.CONFLICT).json({ message:"Admin Already Exists !"});
    }
    const admin = await Admin.create(req.body);
    const adminData = await Admin.findOne({_id:admin._id}).select('-password');
    return res.status(StatusCodes.CREATED).json({message: "Admin Added" });
});


  
const addPlatform = asyncHandler(async(req,res) =>{
    const {platformName} = req.body;
    if(!platformName){
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Fill all the details !"});
    }
    try{
        const isNewPlatform = await Catalog.findOne({platformName});
        if(isNewPlatform)
        {
            return res.status(StatusCodes.CONFLICT).json({message : "Platform Already Exists !"});
        }
        else{
            const newDoc = await Catalog.create({platformName});
            return res.status(StatusCodes.OK).json({message:"New platform added !"});
        }
    }
    catch(err)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : err.message});
    }
});

const addCourse = asyncHandler(async(req,res) => {
    const { platformName, courseName } = req.body;
    if(!platformName || !courseName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide platform and course details." });
    }
    try {
      const platform = await Catalog.findOne({ platformName });
      if(!platform) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Platform does not exist. Please add the platform first." });
      }
      const courses = platform.courses;
      if(courses.includes(courseName.toLowerCase())) {
        return res.status(StatusCodes.CONFLICT).json({ message: "Course already exists in the platform." });
      }
      courses.push(courseName.toLowerCase());
      platform.courses = courses;
      await platform.save();
      return res.status(StatusCodes.OK).json({ message: "Course added successfully!" });
    } catch(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});
  

const deletePlatform = asyncHandler(async(req,res) =>{
    const platformName = req.params.name;
    if(!platformName)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Fill all the details !"});
    }
    try{
        const isPlatformExists = await Catalog.findOne({platformName});
        if(!isPlatformExists)
        {
            return res.status(StatusCodes.NOT_FOUND).json({message : "Platform Does not exist"});
        }
        const result = await Catalog.findOneAndDelete({platformName});
        return res.status(StatusCodes.OK).json({message : "Platform Deleted Successfully !"})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
});


const deleteCourse = asyncHandler(async(req,res) =>{
    const platformName = req.params.platformName;
    const courseName = req.params.courseName;
    const platformData = await Platform.findOne({platformName});
    if(!platformData)
    {
        return res.status(StatusCodes.NOT_FOUND).json({message : "Platform does not exist!"});
    }
    const courses = platformData.courses;
    const courseExists = courses.includes(courseName);
    if(!courseExists)
    {
        return res.status(StatusCodes.NOT_FOUND).json({message : "Course does not exist!"});
    }
    const newCourses = courses.filter((course)=>{
        return course !== courseName;
    });
    platformData.courses = newCourses;
    await platformData.save();
    return res.status(StatusCodes.OK).json({message : "Course deleted successfully!"});
})


const deleteStudent = asyncHandler(async(req,res) =>{
    const rollNo = req.params.rollNo;
    const studentExists = await Student.findOne({rollNo});
    if(studentExists){
        try{
            const studentData = await Student.findOneAndDelete({rollNo});
            return res.status(StatusCodes.OK).json({message : "Student Data deleted !"});
        }
        catch(err)
        {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
        }
    }
    return res.status(StatusCodes.NOT_FOUND).json({message : "Student Not found !"});
})

const updateStudent = asyncHandler(async(req,res) =>{
    const rollNo = req.params.rollNo;
    if(!rollNo)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "rollno not received in params !"});
    }
    if('password' in req.body)
    {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
    }
    const studentData = await Student.findOne({rollNo})
    if(!studentData)
    {
        return res.status(StatusCodes.NOT_FOUND).json({message : "Details Not found !"});
    }
    try{
        for(let key in req.body)
        {
            studentData[key] = req.body[key];
        }
        await studentData.save();
        return res.status(StatusCodes.OK).json({message : "Details updated",data : studentData});
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
})

const getStudentData = asyncHandler(async (req, res) => {
    const rollNo = req.params.rollNo;
    if (!rollNo) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Enter all details!" });
    }
    try {
        const studentInfo = await Student.findOne({ rollNo }).populate('courses queries');
        if (!studentInfo) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Student Not found!" });
        }
        return res.status(StatusCodes.OK).json({ message: "Student Data sent!", data: studentInfo });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
})



//get catalog
const getCatalogData = asyncHandler(async(req,res) => {
    try{
        const data = await Catalog.find({}).select(["platformName",'courses']);
        return res.status(200).json({message : "catalog sent",data});
    }
    catch(err)
    {
        return res.status(500).json({message : err.message});
    }
});

//get queries
const getQueries = asyncHandler(async(req,res,next)=>{
    try{
        const queries = await Query.find({active : true});
        return res.status(StatusCodes.OK).json({message : "queries data sent !",data : queries}); 
    }
    catch(err)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
});



module.exports = {login,addAdmin,addPlatform, addCourse,deletePlatform,deleteCourse,updateStudent,deleteStudent,getStudentData,getCatalogData};