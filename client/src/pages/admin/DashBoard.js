import React, { useEffect, useState } from 'react'
import axios from "axios";
//view all the data of students and their courses in year wise order
//top contains the filters (year,branch,courseName)

const DashBoard = () => {
    const [filterOptions,setFilterOptions] = useState({
        year : "",
        branch : "",
        courseName : ""
    })

    useEffect(() => {
            const response =  axios.get("http://localhost:5000/api/admin/getCatalog",{
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res)=>console.log(res.data)).catch((err)=>console.log(err));
    },[filterOptions])
    
  return (
    <div>
        {/* filter options */}
        <div>
            Filter options
        </div>
        {/* data of students in the form of cards */}
        <div>
            Data of studnets
        </div>
    </div>
  )
}

export default DashBoard