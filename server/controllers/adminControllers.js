const Catalog = require("../models/CourseCatalog");
const Student = require("../models/StudentSchema");
const Query = require("../models/QuerySchema");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");


  
 
/*

CREATE - add admin, add platform , add course
READ - login, get catalog, get queries,get student data
UPDATE - update query
DELETE - delete student, delete platform, delete course,delete query

*/

//create operations

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

//add platform
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
            const response = await Catalog.create({platformName});
            return res.status(StatusCodes.OK).json({message:"New platform added !",data : response});
        }
    }
    catch(err)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : err.message});
    }
});

//add course
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
      if(courses.includes(courseName)) {
        return res.status(StatusCodes.CONFLICT).json({ message: "Course already exists in the platform." });
      }
      courses.push(courseName);
      platform.courses = courses;
      await platform.save();
      return res.status(StatusCodes.OK).json({ message: "Course added successfully!" });
    } catch(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});


//READ

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

//get student data
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
        const queries = await Query.find({active : true,adminMessage : ""});
        return res.status(StatusCodes.OK).json({message : "queries data sent !",data : queries}); 
    }
    catch(err)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
});

//get all students
const getAllStudents = asyncHandler(async(req,res,next)=>{
    try{
        const students = await Student.find().populate({path:"courses",select:['courseName']});
        return res.status(StatusCodes.OK).json({message : "All students data sent !",data : students});
    }
    catch(err)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
})

//get students by course
const getStudentsByCourse = asyncHandler(async (req, res, next) => {
    const courseName = req.params.courseName;
    if (!courseName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Course Name not received!" });
    }
    try {
      const data = await Course.find({ courseName }).populate("student");
  
      const studentIds = new Set();
      const requiredData = [];
  
      data.forEach((course) => {
        if (!studentIds.has(course.student._id)) {
          studentIds.add(course.student._id);
          requiredData.push({
            name: course.student.name,
            year: course.student.year,
            branch: course.student.branch,
            section: course.student.section,
            rollNo : course.student.rollNo
          });
        }
      });
  
      return res
        .status(StatusCodes.OK)
        .json({ message: "Students data sent", data: requiredData });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  });
  

//UPDATE
const updateQuery = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const {message} = req.body;
    if(!message){
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Message is missing"});
    }
    if(!id)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Query id is missing !"});
    }
    try{
        const response = await Query.findByIdAndUpdate(id,{adminMessage :message,active : false});
        return res.status(StatusCodes.OK).json({message : "Query updated !",data:response});
    }
    catch(err)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
});

//DELETE

//delete platform
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
        const response = await Catalog.findOneAndDelete({platformName});
        return res.status(StatusCodes.OK).json({message : "Platform Deleted Successfully !",data:response})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
});

//delete course
const deleteCourse = asyncHandler(async(req,res) =>{
    const platformName = req.params.platformName;
    const courseName = req.params.courseName;
    const platformData = await Catalog.findOne({platformName});
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

//delete student
const deleteStudent = asyncHandler(async(req,res) =>{
    const rollNo = req.params.rollNo;
    const studentExists = await Student.findOne({rollNo});
    if(studentExists){
        try{
            const studentData = await Student.findOneAndDelete({rollNo});
            return res.status(StatusCodes.OK).json({message : "Student Data deleted !",data : studentData});
        }
        catch(err)
        {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
        }
    }
    return res.status(StatusCodes.NOT_FOUND).json({message : "Student Not found !"});
})

//delete query
const deleteQuery = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    if(!id)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "ID not received !"});
    }
    try{
        const response = await Query.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({message : "Query deleted !",data : response});
    }
    catch(err)
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
    }
})


module.exports = {
    addAdmin,
    addPlatform,
    addCourse,
    login,
    getStudentData,
    getCatalogData,
    getQueries,
    getAllStudents,
    getStudentsByCourse,
    updateQuery,
    deleteQuery ,
    deletePlatform,
    deleteCourse,
    deleteStudent,
};






















// const updateStudent = asyncHandler(async(req,res) =>{
//     const rollNo = req.params.rollNo;
//     if(!rollNo)
//     {
//         return res.status(StatusCodes.BAD_REQUEST).json({message : "rollno not received in params !"});
//     }
//     if('password' in req.body)
//     {
//         const hashedPassword = await bcrypt.hash(req.body.password,10);
//         req.body.password = hashedPassword;
//     }
//     const studentData = await Student.findOne({rollNo})
//     if(!studentData)
//     {
//         return res.status(StatusCodes.NOT_FOUND).json({message : "Details Not found !"});
//     }
//     try{
//         for(let key in req.body)
//         {
//             studentData[key] = req.body[key];
//         }
//         await studentData.save();
//         return res.status(StatusCodes.OK).json({message : "Details updated",data : studentData});
//     }
//     catch(err){
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message});
//     }
// })
