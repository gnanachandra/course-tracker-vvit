import { useState } from "react";
import { branch, sections, years } from "../../Data/data";
import "../../styles/Register.css";
import axios from "axios";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackDrop from "../BackDrop";
import { successToast, errorToast } from "../../util/ToastHelper";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      confirmPassword !== form.password
    ) {
      errorToast("Incorrect Details Entered !");
    } else {
      setOpen(true);
      try {
        const response = await axios.post("http://localhost:4000/api/student/register",form,
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
            navigate("/login");
          }, 2000);
        } else {
          errorToast(response.data.message);
        }
      } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
        setOpen(false);
        errorToast(error.response.data.message);
      }
    }
  };

  return (
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
          <div></div>
          <Button variant="contained" type="submit" id="register">
            REGISTER
          </Button>
          <div></div>
          <BackDrop open={open} />
        </form>
        <ToastContainer />
        <Typography variant="h5" style={{textAlign:"center"}}>
          Already registered ? <Link to="/login">Login</Link>
        </Typography>
      </div>
  );
};

export default Register;
