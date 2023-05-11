import React from 'react'
import { useSelector } from 'react-redux'
import { warningToast } from '../../utils/toastHelper'
import { Navigate } from 'react-router-dom'
const Announcement = () => {

  const {isLoggedIn} = useSelector((store)=>store["student"])
  if(!isLoggedIn)
  {
    warningToast("Login to access !")
    return <Navigate to="/login"/>
  }
  return (
    <div>Announcement</div>
  )
    
}

export default Announcement