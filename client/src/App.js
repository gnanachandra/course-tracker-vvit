import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/student/Register";
import Welcome from "./pages/student/Welcome";
import Login from "./pages/student/Login";
import StudentProfile from "./pages/student/StudentProfile";
import Queries from "./pages/student/Queries";
import StudentLayout from "./pages/student/StudentLayout";
import Courses from "./pages/student/Courses";
import Annoucements from "./pages/student/Announcement"
import EditCourse from "./pages/student/EditCourse";
function App() {
  return (
    <Router>
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<StudentLayout/>}>
          <Route path="/" index element={<Welcome/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<StudentProfile />}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/courses/edit/:id" element={<EditCourse/>}></Route>
          <Route path="/queries" element={<Queries />}></Route>
          <Route path="/announcements" element={<Annoucements/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
