import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//student imports
import {StudentLayout,Welcome,Register,Login,StudentProfile,StudentCourses,EditCourse,StudentQueries} from "./pages/imports"
//admin imports
import {AdminLayout,AdminDashBoard,Student,Students,AdminQueries,Platforms,Courses,} from "./pages/imports";
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
          <Route path="/admin" index element={<AdminDashBoard/>}></Route>
          <Route path="students" element={<Students/>}></Route>
          <Route path="student/:id" element={<Student/>}></Route>
          <Route path="queries" element={<AdminQueries/>}></Route>
          <Route path="platforms" element={<Platforms/>}></Route>
          <Route path="courses" element={<Courses/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
