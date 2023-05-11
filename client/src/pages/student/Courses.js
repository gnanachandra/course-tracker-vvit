import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseBackDrop from "../../utils/CourseBackDrop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { warningToast } from '../../utils/toastHelper'
// import { Navigate } from 'react-router-dom'
import {BiLinkExternal} from "react-icons/bi"
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import { getEnrolledCourses, handleAddCourse } from '../../features/student/studentSlice';
const Courses = () => {
  const dispatch = useDispatch();
  const {courses} = useSelector((store)=>store["student"]);
  // const {isLoggedIn} = useSelector((store)=>store["student"])
  // if(!isLoggedIn)
  // {
  //   warningToast("Login to access !")
  //   return <Navigate to="/login"/>
  // }
  useEffect(()=>{
    dispatch(getEnrolledCourses());
  },[])
  const {showCourseBackDrop} = useSelector((store)=>store["student"]);
  const handleAddCourseClick = () => {
    dispatch(handleAddCourse());
  }
  return (
    <div className='p-10'>
      {/* Add new course */}
      <div className='flex justify-end'>
        <input type="button" name="addCourse" value="Add Course" className='cursor-pointer bg-blue-500 text-white font-bold text-lg absolute p-3 rounded-md' onClick={handleAddCourseClick}/>
      </div>
      {/* Enrolled Courses div */}
      <div className='mt-20 flex flex-col gap-y-10'>
        <h3 className='text-xl font-bold'>Enrolled Courses</h3>
        {/* Showing all enrolled courses in card format */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {
            courses.map((course,key)=>{
              return (
                <div class="bg-gray-100 rounded-lg shadow-md">
                  {/* <!-- Edit and delete buttons --> */}
                  <div className="flex justify-end pr-4 pt-4 gap-x-4">
                    <FaEdit className='text-2xl cursor-pointer'/>
                    <MdDelete className='text-2xl cursor-pointer'/>
                  </div>
                  {/* <!-- Course details --> */}
                  <div className="p-4 md:p-10 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="platformName">Platform Name</label>
                      <p className="mt-2 text-gray-900">{course.platformName}</p>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="courseName">Course Name</label>
                      <p className="mt-2 text-gray-900">{course.courseName}</p>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="enrolledIn">Enrolled In</label>
                      <p className="mt-2 text-gray-900">{course.enrolledIn}</p>
                    </div>
                    <div>
                    <a href={course?.certificateLink} className="cursor-pointer font-semibold  inline-block">Certificate<span className="ml-2 inline-block"><BiLinkExternal/></span></a>
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>
      <CourseBackDrop open={showCourseBackDrop}/>
      <ToastContainer/>
    </div>
  )
}

export default Courses