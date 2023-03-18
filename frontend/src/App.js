import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./components/student/Register";
import Login from "./components/Login";
import AddCourse from './components/student/AddCourse';
import HomePage from "./components/student/HomePage";
import Announcements from "./components/student/Announcements";


function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Register/>} exact/>
          <Route path="/login" element={<Login/>} exact/>
          <Route path="/home" element={<HomePage/>} exact/>
          <Route path="/addCourse" element={<AddCourse/>} exact/>
          <Route path="/announcements" element={<Announcements/>} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
