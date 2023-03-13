const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");

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
                return res.status(201).json({message : "Student Enrolled !"});
            }
            catch(err){
                return res.status(500).json({message : err.message});
            }
        }
    }
}


module.exports = {handleNewStudent};