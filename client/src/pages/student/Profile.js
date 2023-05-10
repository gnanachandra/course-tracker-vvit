import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useRef } from "react";
import { uploadToCloud } from "../../features/student/studentSlice";
import BackDrop from "../../utils/BackDrop";

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { user } = useSelector((store) => store["student"]);
  const { isLoading } = useSelector((store) => store["student"]);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    rollNo: user.rollNo,
    branch: user.branch,
    section: user.section,
    year: user.year,
    image: user.image,
    AICTEStudentID: user.AICTEStudentID,
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
  };

  const handleFormChange = (e) => {
    console.log(e.target.name + "  " + e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 bg-gray-100 h-screen">
      {/* Overall div */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image div */}
        <div className="flex items-center justify-center">
          {editing && (
            <div className="flex items-center justify-center flex-col gap-y-4">
              <img
                src={form.image}
                alt="student image"
                className="rounded-full h-52 w-52 cursor-pointer"
                onClick={handleClick}
              />
              <input
                type="button"
                value={"Save Changes"}
                onClick={updateProfile}
                className="cursor-pointer bg-blue-500 p-4 rounded-md mt-2"
              />
            </div>
          )}
          {!editing && (
            <div className="flex items-center justify-center flex-col gap-y-4">
              <img
                src={form.image}
                alt="student image"
                className="rounded-full h-52 w-52"
              />
              <input
                type="button"
                value={"Edit profile"}
                onClick={() => setEditing(true)}
                className="cursor-pointer bg-blue-500 p-4 rounded-md mt-2"
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
          {editing ? (
            <div className="flex justify-around flex-row">
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
          ) : (
            <div className="flex flex-row">
              <div className="flex gap-x-4 items-center flex-col">
                <label
                  htmlFor="name"
                  className="inline-block text-lg font-medium"
                >
                  Name
                </label>
                <label
                  htmlFor="student RollNo"
                  className="inline-block text-lg font-medium"
                >
                  Roll No
                </label>
                <label
                  htmlFor="student email"
                  className="inline-block text-lg font-medium"
                >
                  Email
                </label>
                <label
                  htmlFor="student Year"
                  className="inline-block text-lg font-medium"
                >
                  Year
                </label>
                <label
                  htmlFor="student Branch"
                  className="inline-block text-lg font-medium"
                >
                  Branch
                </label>
                <label
                  htmlFor="student Section"
                  className="inline-block text-lg font-medium"
                >
                  Section
                </label>
                <label htmlFor="AicteID" className="inline-block text-lg font-medium">AicteID</label>
              </div>
              <div className="flex gap-x-4 items-center flex-col">
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleFormChange}
                  value={form.name}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                <input
                  type="text"
                  name="rollNo"
                  onChange={handleFormChange}
                  value={form.rollNo}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                <input
                  type="email"
                  name="email"
                  onChange={handleFormChange}
                  value={form.email}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                <input
                  id="year"
                  type="text"
                  name="year"
                  onChange={handleFormChange}
                  value={form.year}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                <input
                  type="text"
                  name="branch"
                  onChange={handleFormChange}
                  value={form.branch}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                
                <input
                  type="text"
                  name="section"
                  onChange={handleFormChange}
                  value={form.branch}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
                
                <input
                  type="text"
                  name="branch"
                  onChange={handleFormChange}
                  value={form.branch}
                  className="border-gray-400 border-2 rounded-md p-2 w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <BackDrop open={isLoading} />
      <ToastContainer />
    </div>
  );
};

export default Profile;
