import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
