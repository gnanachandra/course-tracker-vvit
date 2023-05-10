import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./pages/student/Register";
import Welcome from "./pages/student/Welcome";
import Login from "./pages/student/Login";
import Profile from "./pages/student/Profile";
import DashBoard from "./pages/admin/DashBoard";
import AddCourse from "./pages/student/AddCourse";
import StudentProfile from "./pages/student/StudentProfile";


function App() {
  return (
    <Router>
      <Routes>

        {/* Student Routes */}
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<StudentProfile/>}></Route>
        <Route path="/addCourse" element={<AddCourse/>}></Route>


        <Route path="/Dashboard" element={<DashBoard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
