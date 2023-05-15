import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { updateStudentProfile, uploadToCloud } from "../../features/student/studentSlice";
import BackDrop from "../../utils/BackDrop";
import { Navigate } from 'react-router-dom'
const branches = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "CSM",
  "AID",
  "IOT",
  "CIC",
  "MECH",
  "CIVIL",
];
const sections = ["A", "B", "C", "D"];
const years = ['1','2','3','4'];
const StudentProfile = () => {

  const {isLoggedIn} = useSelector((store)=>store["student"])
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { user } = useSelector((store) => store["student"]);
  const { isLoading } = useSelector((store) => store["student"]);
  const [form, setForm] = useState({
    name: user?.name,
    email: user?.email,
    rollNo: user?.rollNo,
    branch: user?.branch,
    section: user?.section,
    year: user?.year,
    image: user?.image,
    AICTEStudentID: user?.AICTEStudentID,
  });

  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (e) => {
    console.log("name : ", e.target.name);
    const file = e.target.files[0];
    const response = await dispatch(uploadToCloud(file));
    setForm({ ...form, [e.target.name]: response.payload[0] });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("updated Details : ",form);
    console.log("Dispatching update profile")
    dispatch(updateStudentProfile(form));
  };

  const handleFormChange = (e) => {
    console.log(e.target.name + "  " + e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if(!isLoggedIn)
  {
    return <Navigate to="/login"/>
  }
  return (
  isLoggedIn && 
  (
    <div className="pt-20 bg-gray-100 min-h-screen">
      {/* Overall div */}
      <div className="grid grid-cols-1">
        {/* Image div */}
        <div className="flex items-center justify-center">
          {editing && (
            <div className="flex items-center justify-center flex-col gap-y-4">
              <img
                src={form.image}
                alt="student"
                className="rounded-full h-52 w-52 cursor-pointer"
                onClick={handleClick}
              />
              
            </div>
          )}
          {!editing && (
            <div className="flex items-center justify-center flex-col gap-y-4">
              <img
                src={form.image}
                alt="student"
                className="rounded-full h-52 w-52"
              />
              
            </div>
          )}
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div>
          {/* Student Details Div */}
          {/* editing = false */}
          <h3 className="font-bold text-center text-2xl mb-6">
            Student Details
          </h3>
          {!editing ? (
            <>
            <div className="flex justify-evenly flex-row">
              <div className="flex flex-col gap-y-4">
                <label htmlFor="studentName" className="font-semibold text-xl">
                  Name
                </label>
                <label htmlFor="rollNo" className="font-semibold text-xl">
                  Roll No
                </label>
                <label htmlFor="email" className="font-semibold text-xl">
                  Email
                </label>
                <label htmlFor="branch" className="font-semibold text-xl">
                  Branch
                </label>
                <label htmlFor="year" className="font-semibold text-xl">
                  Year
                </label>
                <label htmlFor="section" className="font-semibold text-xl">
                  Section
                </label>
                <label htmlFor="AICTE ID" className="font-semibold text-xl">
                  AICTE ID
                </label>
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-lg font-medium">{user.rollNo}</p>
                <p className="text-lg font-medium">{user.email}</p>
                <p className="text-lg font-medium">{user.branch}</p>
                <p className="text-lg font-medium">{user.year}</p>
                <p className="text-lg font-medium">{user.section}</p>
                <p className="text-lg font-medium">{user.AICTEStudentID}</p>
              </div>
            </div>
            <input
            type="button"
            value={"Edit profile"}
            onClick={() => setEditing(true)}
            className="cursor-pointer bg-blue-500 p-4 rounded-md absolute left-1/2 -translate-x-1/2 mt-5"
            />
             </>
          ) : (
            <div className="flex items-center justify-center container">
              <form className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-4" onSubmit={(e)=>updateProfile(e)}>
                <div className="flex justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form?.name}
                    className="color-white shadow-md p-4 rounded-md active:shadow-none"
                    placeholder="Enter your name"
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    className="color-white shadow-md p-4 rounded-md active:shadow-none"
                    placeholder="Enter vvit mail"
                    onChange={handleFormChange}
                  />
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="rollNo">
                    RollNo
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    value={form.rollNo}
                    className="color-white shadow-md p-4 rounded-md active:shadow-none"
                    placeholder="Enter your rollNo"
                    onChange={handleFormChange}
                  />
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="year">
                    Year
                  </label>
                  <select
                    className="p-3 rounded-md shadow-md"
                    name="year"
                    onChange={handleFormChange}
                    value={form.year}
                  >
                    <option value="Select Year" key={"-1"} disabled>
                      Select Year
                    </option>
                    {years.map((year, index) => {
                      return (
                        <option value={year} key={index}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="branch">
                    Branch
                  </label>
                  <select
                    className="p-3 rounded-md shadow-md"
                    name="branch"
                    onChange={handleFormChange}
                    value={form.branch}
                  >
                    <option value="Select Branch" key={"-1"} disabled>
                      Select Branch
                    </option>
                    {branches.map((branch, index) => {
                      return (
                        <option value={branch} key={index}>
                          {branch}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="section">
                    Section
                  </label>
                  <select
                    className="p-3 rounded-md shadow-md"
                    name="section"
                    onChange={handleFormChange}
                    value={form.section}
                  >
                    <option value="Select Section" key={"-1"} disabled>
                      Select Section
                    </option>
                    {sections.map((section, index) => {
                      return (
                        <option value={section} key={index}>
                          {section}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex  justify-center gap-y-2 flex-col">
                  <label className="font-semibold" htmlFor="AICTEStudentID">
                    AICTEStudentID
                  </label>
                  <input
                    type="text"
                    name="AICTEStudentID"
                    value={form.AICTEStudentID}
                    className="color-white shadow-md p-4 rounded-md active:shadow-none"
                    placeholder="Enter AICTE ID"
                    onChange={handleFormChange}
                  />
                  
                </div>
                <div className="flex items-center justify-center">
                  <input type="submit" name="submit" value={"save changes"} className="bg-blue-400 h-1/2 w-2/3 cursor-pointer" onClick={updateProfile}/>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <BackDrop open={isLoading} />
      <ToastContainer />
    </div>
  )
  );
};

export default StudentProfile;
