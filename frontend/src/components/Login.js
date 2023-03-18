import React, { useState } from "react";
import "../styles/Login.css";
import { TextField, Button, Paper, FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import { errorToast, successToast } from "../util/ToastHelper";
import { ToastContainer } from "react-toastify";


const Login = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setOpen(true);
    const response = await fetch("http://localhost:4000/login",{
      method:"POST",
      body:JSON.stringify(form),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    });
    
    const res = await response.json();
    setOpen(false);
    const data = res.data;
    if(!data){
      errorToast("Invalid Login Credentials");
    }
    else{
      const {name,rollNo,email,branch,section,AICTEStudentID,year,role} = data;
      const userData = {name,rollNo,email,branch,section,AICTEStudentID,year,role};
      localStorage.setItem("user",JSON.stringify(userData));
      setTimeout(() => {
        successToast("Login Successful...");
      }, 100);
      navigate("/home");
    }
  }
  return (
    <div className="outerLoginDiv">
      <Paper>
        <h1 style={{"textAlign":"center"}}>Login</h1>
        <div className="loginDiv">
          <form onSubmit={handleSubmit} className="loginForm">
            <FormLabel>Email</FormLabel>
            <TextField
              color="secondary"
              size="small"
              name="email"
              type={"email"}
              value={form.email}
              onChange={handleFormChange}
              required
            />
            <FormLabel>Password</FormLabel>
            <TextField
              color="secondary"
              size="small"
              name="password"
              value={form.password}
              type={"password"}
              onChange={handleFormChange}
              required
            />
            <Button variant="contained" type="submit" id="login">
              login
            </Button>
            <BackDrop open={open}></BackDrop>
            <ToastContainer/>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
