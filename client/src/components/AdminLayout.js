import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <AdminHeader/>
      <section>
        <Outlet/>
      </section>
    </>
  )
}

export default AdminLayout