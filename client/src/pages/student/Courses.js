import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import BackDrop from '../../utils/BackDrop';
import CourseBackDrop from "../../utils/CourseBackDrop";
import {BiLinkExternal} from "react-icons/bi"
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import { getEnrolledCourses, handleAddCourse,deleteCourse } from '../../features/student/studentSlice';

const Courses = () => {
  const dispatch = useDispatch();
  const {courses} = useSelector((store)=>store["student"]);
  const {isLoading} = useSelector((store)=>store["student"]);
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
  const handleCourseEdit = (courseId) => {
    console.log("Course ID in edit course : ",courseId);
  }
  // const handleCourseDelete = (courseId) => {
  //   console.log("Course ID in delete course : ",courseId);
  // }
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
            courses && courses.map((course,index)=>{
              return (
                <div className="bg-gray-100 rounded-lg shadow-md" key={index}>
                  {/* <!-- Edit and delete buttons --> */}
                  <div className="flex justify-end pr-4 pt-4 gap-x-4">
                    <Link to={`/courses/edit/${course?._id}`}> <FaEdit className='text-2xl cursor-pointer'/></Link>
                    <MdDelete className='text-2xl cursor-pointer' onClick={()=>dispatch(deleteCourse({id:course?._id}))} />
                  </div>
                  {/* <!-- Course details --> */}
                  <div className="p-4 md:p-10 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="platformName">Platform Name</label>
                      <p className="mt-2 text-gray-900">{course?.platformName}</p>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="courseName">Course Name</label>
                      <p className="mt-2 text-gray-900">{course?.courseName}</p>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700" htmlFor="enrolledIn">Enrolled In</label>
                      <p className="mt-2 text-gray-900">{course?.enrolledIn}</p>
                    </div>
                    { course.certificateLink && 
                      <div>
                        <a href={course?.certificateLink} className="cursor-pointer font-semibold  inline-block" target='_blank' rel="noreferrer">Certificate<span className="ml-2 inline-block"><BiLinkExternal/></span></a>
                      </div>
                    
                    }
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>
      <BackDrop open={isLoading}/>
      <CourseBackDrop open={showCourseBackDrop}/>
      <ToastContainer/>
    </div>
  )
}

export default Courses