import React from "react";
import { useState } from "react";
import { branch, sections, years } from "../../Data/data";
import "../../styles/Register.css";
import validator, { passwordValidation } from "../../util/Validations";
import { TextField, MenuItem, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackDrop from "../BackDrop";
import { successToast, errorToast } from "../../util/ToastHelper";
import { Link } from "react-router-dom";
import Login from "../Login";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    AICTEStudentID: "",
    branch: "",
    section: "",
    year: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const message = await validator(form);
    if(message === true)
    {
      if(passwordValidation(form.password,confirmPassword))
      {
        setOpen(true);
        const response = await fetch("http://localhost:4000/api/studentregister",{
          method:"POST",
          body:JSON.stringify(form),
          headers:{
            "Content-type": "application/json; charset=UTF-8",
          }
        })
  
        const res = await response.json();
        setOpen(false);
        if(res.status === "failed"){
          errorToast("Student already registered");
        }
        else{
          successToast("Registeration Successful !");
        }
      }
      else{
        errorToast("Passwords doesnot match")
      }
    }
    else{
      errorToast(message);
    }
  }

  return (
    <div className="outerRegisterationDiv">
    <div className="registeration">
      <h1 style={{ textAlign: "center" }}>Registeration FORM</h1>
      <form onSubmit={handleSubmit} className="registerationForm">
        <TextField
          value={form.name}
          autoFocus
          margin="dense"
          className="input"
          label="Name"
          variant="outlined"
          color="secondary"
          required
          type="text"
          name="name"
          size="small"
          onChange={handleFormChange}
        />
        <TextField
          value={form.email}
          margin="dense"
          className="input"
          label="Email"
          variant="outlined"
          color="secondary"
          required
          type="text"
          name="email"
          size="small"
          placeholder="Enter vvit mail"
          onChange={handleFormChange}
        />
        <TextField
          value={form.rollNo}
          margin="dense"
          className="input"
          label="Roll Number"
          variant="outlined"
          color="secondary"
          required
          type="text"
          name="rollNo"
          size="small"
          onChange={handleFormChange}
        />
        <TextField
          value={form.AICTEStudentID}
          margin="dense"
          className="input"
          label="AICTE StudentID"
          variant="outlined"
          color="secondary"
          required
          type="text"
          name="AICTEStudentID"
          size="small"
          onChange={handleFormChange}
        />
        <TextField
          label="Branch"
          size="small"
          name="branch"
          select
          value={form.branch}
          fullWidth
          onChange={handleFormChange}
          required
        >
          {branch.map((branchName) => {
            return (
              <MenuItem value={branchName} key={branchName}>
                {branchName}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          label="section"
          size="small"
          name="section"
          select
          value={form.section}
          fullWidth
          onChange={handleFormChange}
          required
        >
          {sections.map((section) => {
            return (
              <MenuItem value={section} key={section}>
                {section}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          label="year"
          size="small"
          name="year"
          select
          value={form.year}
          fullWidth
          onChange={handleFormChange}
          required
        >
          {years.map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          value={form.password}
          margin="dense"
          className="input"
          label="password"
          variant="outlined"
          color="secondary"
          required
          type="password"
          name="password"
          size="small"
          onChange={handleFormChange}
        />
        <TextField
          value={form.confirmPassword}
          margin="dense"
          className="input"
          label="Confirm password"
          variant="outlined"
          color="secondary"
          required
          type="password"
          name="confirmPassword"
          size="small"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" type="submit" id="register">
          REGISTER
        </Button>
        <br />
        <br />
        <BackDrop open={open} />
      </form>
      <ToastContainer />
      <p style={{"textAlign":"center"}}>Already registered ? <Link to="/login">Login</Link></p>
    </div>
    </div>

  );
};

export default Register;
