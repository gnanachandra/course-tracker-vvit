import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//student imports
import {StudentLayout,Welcome,Register,Login,StudentProfile,StudentCourses,EditCourse,StudentQueries} from "./pages/imports"
//admin imports
import {AdminLayout,Student,Students,AdminQueries,Platforms,Courses,AdminLogin} from "./pages/imports";
import DemoElement from "./utils/DemoElement";
import AdminDashBoard from "./components/AdminDashBoard";
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
          <Route path="/courses" element={<StudentCourses/>}></Route>
          <Route path="/courses/edit/:id" element={<EditCourse/>}></Route>
          <Route path="/queries" element={<StudentQueries />}></Route>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="/admin" element={<AdminDashBoard/>}>
            <Route path="count/:id" element={<DemoElement/>}></Route>
          </Route>
          <Route path="login" element={<AdminLogin/>}></Route>
          <Route path="students" element={<Students/>}></Route>
          <Route path="student/:id" element={<Student/>}></Route>
          <Route path="queries" element={<AdminQueries/>}></Route>
          <Route path="platforms-courses" element={<Platforms/>}></Route>
          <Route path="courses" element={<Courses/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
