import React, { useEffect, useState } from 'react'
import { successToast,errorToast } from '../utils/toastHelper';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentRegisteration } from '../features/student/studentSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const branches = ['CSE','IT','ECE','EEE','CSM','AID','IOT','CIC','MECH','CIVIL']
const sections = ['A','B','C','D']
const years = ['I','II','III','IV']

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((store)=>store["student"].user);
  const message = useSelector((store)=>store["student"].message);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    AICTEStudentID: "",
    branch: "",
    section: "",
    year: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormChange = (e) => {
    console.log(e.target.name + "  " + e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(form.password !== confirmPassword)
    {
      errorToast("Passwords does not match")
    }
    else{
      dispatch(studentRegisteration(form))
    }
    console.log(form);
  }

  useEffect(() => {
    if(message === "Student Enrolled !")
    {
      successToast("Registeration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    }
    else if(message !== "processing" && message !== ""){
      errorToast(message);
    }
  }, [message,navigate])
  
  

 
  
  return (
    <div className='flex items-center justify-center flex-col container gap-y-5'>
      <div>
        <img src="vvit-logo.png" alt="vvit"  className='w-64 mt-8'/>
      </div>
      <div className='w-4/5'>
        <form className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-4'>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='name'>Name</label>
            <input type="text" name="name" value={form.name} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Enter your name' onChange={handleFormChange} required/>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='email'>Email</label>
            <input type="email" name="email" value={form.email} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Enter vvit mail' onChange={handleFormChange}/>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='rollNo'>RollNo</label>
            <input type="text" name="rollNo" value={form.rollNo} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Enter your rollNo' onChange={handleFormChange}/>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='year'>Year</label>
            <select className='p-3 rounded-md shadow-md' name='year' onChange={handleFormChange} defaultValue={"Select Year"}>
              <option value="Select Year" key={"-1"}  disabled>Select Year</option>
              {
                years.map((year,index)=>{
                  return <option value={year} key={index}>{year}</option>
                })
              }
            </select>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='branch'>Branch</label>
            <select className='p-3 rounded-md shadow-md' name='branch' onChange={handleFormChange} defaultValue={"Select Branch"}>
            <option value="Select Branch" key={"-1"}  disabled>Select Branch</option>
              {
                branches.map((branch,index)=>{
                  return <option value={branch} key={index}>{branch}</option>
                })
              }
            </select>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='section'>Section</label>
            <select className='p-3 rounded-md shadow-md' name='section' onChange={handleFormChange} defaultValue={"Select Section"}>
            <option value="Select Section" key={"-1"}  disabled>Select Section</option>
              {
                sections.map((section,index)=>{
                  return <option value={section} key={index}>{section}</option>
                })
              }
            </select>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='AICTEStudentID'>AICTEStudentID</label>
            <input type="text" name="AICTEStudentID" value={form.AICTEStudentID} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Enter AICTE ID' onChange={handleFormChange}/>
          </div>
          
          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='password'>Password</label>
            <input type="password" name="password" value={form.password} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Enter Password' onChange={handleFormChange}/>
          </div>

          <div className='flex  justify-center gap-y-2 flex-col'>  
            <label className='font-semibold' htmlFor='confirmPassword'>Confirm Password</label>
            <input type="password" name="confirmPassword" value={confirmPassword} className='color-white shadow-md p-4 rounded-md active:shadow-none' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
          
          <div className=''>
          <input
            type="submit"
            name="submit"
            value="Register"
            onClick={handleSubmit}
            className="bg-blue-600 text-white text-md font-bold p-3 px-4 rounded-md mt-3 hover:bg-blue-700 cursor-pointer absolute left-1/2 -translate-x-1/2"
          />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register