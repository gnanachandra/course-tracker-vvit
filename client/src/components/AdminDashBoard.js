import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const AdminDashBoard = () => {
  return (
    // main div
    <div className='flex'>
        {/* side div */}
        <div className='bg-red-400 h-screen w-1/4 flex items-center justify-center flex-col gap-10'>
            <Link to={"/admin/count/1"} className='cursor-pointer'>Count-1</Link>
            <Link to={"/admin/count/2"} className='cursor-pointer'>Count-2</Link>
            <Link to={"/admin/count/3"} className='cursor-pointer'>Count-3</Link>
        </div>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default AdminDashBoard



// what should be in admin dashboard
// 1. Add admin
// 2. view dept wise admins
// add platform
// add course
// 