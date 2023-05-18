import React from 'react'
import Header from './Header'
import {  Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <div>
        <Header/>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default StudentLayout