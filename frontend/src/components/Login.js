import React, { useState } from "react";
import "../styles/Login.css";
import { TextField, Button, FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import { errorToast, successToast } from "../util/ToastHelper";
import { ToastContainer } from "react-toastify";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user input on the client side
    if (!form.email || !form.password) {
      return errorToast("Please fill in all fields");
    }

    setOpen(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/student/login",
        form,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setOpen(false);
      if (response.status === 200) {
        successToast(response.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
      else{
        errorToast(response.data.message);
      }
    } catch (err) {
      setOpen(false);
      errorToast(err.response.data.message);
    }
  };

  return (
    <div className="logindiv">
      <h1 style={{ textAlign: "center" }}>Login</h1>
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
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
