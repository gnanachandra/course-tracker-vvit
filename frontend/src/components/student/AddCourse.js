import { TextField, MenuItem, Button } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import "../../styles/AddCourse.css";
import { errorToast, successToast, warningToast } from "../../util/ToastHelper";
import { AICTE_Courses, APSCHE_Courses, platforms, Sem } from "../../Data/data";
import BackDrop from "../BackDrop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddCourse = () => {
  const navigate = useNavigate();
  const [data,setData] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    platformName: "",
    courseName: "",
    enrolledIn: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get("http://localhost:5000/api/admin/getCatalog");
      console.log(response);
    }
    fetchData();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      const response = await axios.post("http://localhost:4000/api/student/course/new",form,
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        setOpen(false);
      console.log(response);
      setOpen(false);
      if (response.status === 200) {
        successToast(response.data.message);
        setTimeout(()=>{
          navigate('/home');
        },2000);
      } else {
        warningToast(response.data.message);
      }
    } catch (err) {
      setOpen(false);
      errorToast(err.response.data.message);
    }
  };
  return (
    <div className="outerFormDiv">
      <form onSubmit={handleSubmit} className="addCourseForm">
        <TextField
          required
          label="Select Platform"
          name="platformName"
          select
          fullWidth
          value={form.platformName}
          onChange={handleFormChange}
        >
          {platforms.map((name) => {
            return (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            );
          })}
        </TextField>
        

        <TextField
          label="Select Course"
          name="courseName"
          select
          fullWidth
          value={form.courseName}
          onChange={handleFormChange}
          required
        >
          {form.platformName === "AICTE" &&
            AICTE_Courses.map((name) => {
              return (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              );
            })}
          {form.platformName === "APSCHE" &&
            APSCHE_Courses.map((name) => {
              return (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              );
            })}
        </TextField>

        <TextField
          required
          label="Current Semester"
          name="enrolledIn"
          select
          fullWidth
          value={form.enrolledIn}
          onChange={handleFormChange}
        >
          {Sem.map((name) => {
            return (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            );
          })}
        </TextField>

        <Button variant="contained" type="submit">
          Add Course
        </Button>
        <BackDrop open={open} />
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddCourse;
