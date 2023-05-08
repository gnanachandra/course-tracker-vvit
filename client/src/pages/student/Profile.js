import React,{useState} from 'react'
import {useSelector} from "react-redux"
const Profile = () => {
  const user = useSelector((store)=>store["student"].user);
  const [edit,setEdit] = useState(false);
  return (
    // Overall div
    <div className='grid sm:grid-cols-1 md:grid-cols-2 min-h-screen pt-20 gap-y-10'>
      {/* Image section */}
      <div className='flex justify-center'>
        <img src="./cartoon.jpg" alt="student" className='h-52 w-52 '/>
      </div>
      {/* Details section */}
      <div className='grid justify-center grid-cols-1 md:grid-cols-2'>
        <div className=''>
          <label htmlFor="Name" className='font-bold'>Name :</label>
          <p>{user.name}</p>
        </div>
        <div className=''>
          <label htmlFor="rollNo" className='font-bold'>Roll No :</label>
          <p>{user.rollNo}</p>
        </div>
        <div className=''>
          <label htmlFor='branch'  className='font-bold'>Branch : </label>
          <p>{user.branch}</p>
        </div>
        <div className=''>
          <label htmlFor='section'  className='font-bold'>Section : </label>
          <p>{user.section}</p>
        </div>
        <div className=''>
          <label htmlFor='year'  className='font-bold'>Year : </label>
          <p>{user.year}</p>
        </div>
        <div className=''>
          <label htmlFor='email'  className='font-bold'>Email : </label>
          <p>{user.email}</p>
        </div>
        <input type="button" name="addCourse" value="AddCourse"/>
      </div>
    </div>
  )
}

export default Profile