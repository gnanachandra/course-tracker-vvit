import { TextField, MenuItem, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import "../../styles/AddCourse.css";
import { errorToast, successToast, warningToast } from "../../util/ToastHelper";
import {AICTE_Courses,APSCHE_Courses,platforms,Sem,} from "../../Data/data";
import BackDrop from "../BackDrop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "20bq1a05p2@vvit.net",
    platform: "",
    courseName: "",
    enrolledIn: "",
  });
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const response = await fetch("http://localhost:4000/addCourse", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const body = await response.json();
    setOpen(false);
    if (body.message === "user enrolled in the course") {
      successToast("Course Added Successfully")
    } else if (body.message === "user already enrolled in the course") {
      warningToast("Duplicate Enrollment")
    } else {
      errorToast("something went wrong");
    }
    
  };
  return (
    <div className="outerFormDiv">
      <form onSubmit={handleSubmit}  className="addCourseForm">
        <TextField
          required
          label="Select Platform"
          name="platform"
          select
          fullWidth
          value={form.platform}
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
          {form.platform === "AICTE" &&
            AICTE_Courses.map((name) => {
              return (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              );
            })}
          {form.platform === "APSCHE" &&
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

        <Button variant="contained" type="submit" >
          Add Course
        </Button>
        <BackDrop open={open}/>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default AddCourse;
