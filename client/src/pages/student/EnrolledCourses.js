import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { getEnrolledCourses } from '../../features/student/studentSlice';

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((store)=>store["student"].courses);
  useEffect(()=>{
    dispatch(getEnrolledCourses());
  },[]);

  return (
    <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {
        enrolledCourses.map((course)=>{
          return (
            <div className='bg-gray-100'>
              <div className='flex gap-x-3'>  
                <label for="platformName">Platform</label>
                <p className=''>{course.platformName}</p>
              </div>
              <div className='flex'>
                <label for="courseName">Course</label>
                <p className=''>{course.courseName}</p>
              </div>
              <div className='flex'>
                <label for="Semester">Semester</label>
                <p className=''>{course.enrolledIn}</p>
              </div>
            </div>
          )   
        })
      }
    </div>
  )
}

export default EnrolledCourses