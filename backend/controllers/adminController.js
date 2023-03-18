const Catalog = require("../models/CourseCatalog");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
//admin login
const Login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found !"});
    }
  
    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
    }
    const token = admin.createJWT();
    const adminData = await Admin.findOne({_id:admin._id}).select('-password');
    return res.status(StatusCodes.OK).json({ adminData, token });
});

//add admin
const addAdmin = asyncHandler(async(req, res, next) => {
    const { name, image, email, password, mobile} = req.body;
    if ( !name || !image || !email || !password || !mobile ) {
      return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
    }
    const isAdmin = await Admin.findOne({ email });
    if(isAdmin) {
      return res.status(StatusCodes.CONFLICT).json({ message:"Admin Already Exists !"});
    }
    const admin = await Admin.create(req.body);
    const adminData = await Admin.findOne({_id:admin._id}).select('-password');
    return res.status(StatusCodes.CREATED).json({  msg: "Admin Added ",adminData });
});

  
const addPlatform = async(req,res) =>{
    const {platformName,courseName} = req.body;
    if(!platformName || !courseName){
        return res.status(400).json({message : "Fill all the details !"});
    }
    else{
        try{
            const isNewPlatform = await Platform.findOne({platformName});
            if(isNewPlatform)
            {
                return res.status(409).json({message : "Platform Already Exists !"});
            }
            else{
                const newDoc = await Platform.create({platformName,courses:courseName});
                return res.status(201).json({message:"New platform and course added !"});
            }
        }
        catch(err)
        {
            return res.status(400).json({message : err.message});
        }
    }
}

const addCourse = async(req,res) =>{
    const {platformName,courseName} = req.body;
    if(!platformName || !courseName){
        return res.status(400).json({message : "Fill all the details"});
    }
    else{
        try{
            const platformExists = await Platform.findOne({platformName});
            if(!platformExists)
            {
                return res.status(400).json({message : "Platform doesnot exists ! Add the platform First "});
            }
            else{
                const courses = platformExists['courses'];
                for(let i=0;i<courses.length;i++)
                {
                    if(courseName.toLowerCase() === courses[i].toLowerCase())
                    {
                        return res.status(409).json({message : "Course Already Exists !"})
                    }
                }
                courses.push(courseName);
                platformExists['courses'] = courses;
                await platformExists.save();
                return res.status(201).json({message : "Course added successfully !"})
            }
        }
        catch(err)
        {
            return res.status(500).json({message : err.message});
        }
    }
}

const deletePlatform = async(req,res) =>{
    const platformName = req.params.name;
    if(!platformName)
    {
        return res.status(400).json({message : "Fill all the details !"});
    }
    else{
        try{
            const isPlatformExists = await Platform.findOne({platformName});
            if(!isPlatformExists)
            {
                return res.status(404).json({message : "Platform Doesnot exist"});
            }
            else{
                const result = await Platform.findOneAndDelete({platformName});
                return res.status(200).json({message : "Platform Deleted Successfully !"})
            }
        }
        catch(err){
            return res.status(500).json({message : err.message});
        }
    }
}

const deleteCourse = async(req,res) =>{
    const platformName = req.params.platformName;
    const courseName = req.params.courseName;
    const isPlatformExists = await Platform.findOne({platformName});
    if(!isPlatformExists)
    {
        return res.status(404).json({message : "Platform doesnot exist !"});
    }
    else{
        const courses = isPlatformExists['courses'];
        const courseExists = courses.find((coursename) => coursename ===courseName);
        if(!courseExists)
        {
            return res.status(404).json({message : "Course doesnot exists !"});
        }
        else{
            const newCourses = courses.filter((course)=>{
                course !== courseName;
            });
            isPlatformExists['courses'] = newCourses;
            isPlatformExists.save();
            return res.status(200).json({message : "Course deleted !"});
        }

    }
}

const deleteStudent = async(req,res) =>{
    const rollNo = req.params.rollNo;
    const studentExists = await Student.findOne({rollNo});
    if(studentExists){
        try{
            const studentData = await Student.findOneAndDelete({rollNo});
            return res.status(200).json({message : "Student Data deleted !"});
        }
        catch(err)
        {
            return res.status(500).json({message : err.message});
        }
    }
    else{
        return res.status(404).json({message : "Student Not found !"});
    }
}

const updateStudent = async(req,res) =>{
    const rollNo = req.params.rollNo;
    if('password' in req.body)
    {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
    }
    const studentData = await Student.findOne({rollNo})
    if(!studentData)
    {
        return res.status(404).json({message : "Details Not found !"});
    }
    else{
        try{
            for(let key in req.body)
            {
                studentData[key] = req.body[key];
            }
            await studentData.save();
            return res.status(200).json({message : "Details updated",studentData});
        }
        catch(err){
            return res.status(500).json({message : err.message});
        }
    }
}

const getStudentData = async(req,res) =>{
    const rollNo = req.params.rollNo;
    if(!rollNo){
        return res.status(400).json({message :"Enter all details !"});
    }
    else{
        const studentInfo = await Student.findOne({rollNo});
        if(!studentInfo)
        {
            return res.status(404).json({message : "Student Not found !"});
        }
        else{
            return res.status(200).json({message : "Student Data sent !",data : await studentInfo.populate('courses queries')});
        }
    }
}
module.exports = {Login,addAdmin,addPlatform, addCourse,deletePlatform,deleteCourse,updateStudent,deleteStudent,getStudentData};