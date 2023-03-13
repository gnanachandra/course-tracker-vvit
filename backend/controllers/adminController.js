const Platform = require("../models/Platform");

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
            return res.status(201).json({message : "Course deleted !"});
        }

    }
}
module.exports = {addPlatform, addCourse,deletePlatform,deleteCourse};