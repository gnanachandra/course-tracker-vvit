import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogData, registerCourse } from "../../features/student/studentSlice";
import BackDrop from "../../utils/BackDrop";
import { ToastContainer } from "react-toastify";
import { cancelAddCourse } from "../../features/student/studentSlice";
const AddCourse = () => {
  const sems = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const {isLoading} = useSelector((store)=>store["student"])
  const { catalog } = useSelector((store) => store["student"]);
  const dispatch = useDispatch();
  const platforms = Object.keys(catalog);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    platform: "",
    course: "",
    semester: "",
  });
  
  useEffect(() => {
    dispatch(getCatalogData());
  },[]);
  
  const handlePlatformChange = (e) => {
    const platformName = e.target.value;
    setCourses(catalog[platformName]);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerCourse(form));
  };

  return (
    <div className="flex items-center justify-center flex-col gap-y-5 bg-gray-100  p-10">
      <div className="w-auto">
        <form className="grid sm:grid-cols-1 gap-x-10 gap-y-4">
          <h2 className="font-bold text-black text-xl text-center">Add Course</h2>
          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold text-black" htmlFor="platform">Platform</label>
            <select
              className="p-3 rounded-md shadow-md  text-black"
              name="platform"
              onChange={(e) => {
                handleFormChange(e);
                handlePlatformChange(e);
              }}
              defaultValue={"Select Platform"}>
              <option value="Select Platform" key={"-1"} disabled className="text-black">
                Select Platform
              </option>
              {platforms.map((platformName, index) => {
                return (
                  <option value={platformName} key={index} className="text-black">
                    {platformName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold text-black" htmlFor="courseName">
              Courses
            </label>
            <select
              className="p-3 rounded-md shadow-md text-black"
              name="course"
              onChange={handleFormChange}
              defaultValue={"Select Course"}>
              <option value="Select Course" key={"-1"} disabled>
                Select Course
              </option>
              {courses.map((courseName, index) => {
                return (
                  <option value={courseName} key={index} className="text-black">
                    {courseName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold text-black" htmlFor="enrolledIn">
              Enrolled In
            </label>
            <select
              className="p-3 rounded-md shadow-md text-black"
              name="semester"
              onChange={handleFormChange}
              defaultValue={"Select Semester"}>
              <option value="Select Semester" key={"-1"} disabled className="text-black">
                Select Semester
              </option>
              {sems.map((semester, index) => {
                return (
                  <option value={semester} key={index}>
                    {semester}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-center gap-x-5 px-8">
            <input
                type="button"
                name="cancel"
                value="Cancel"
                onClick={() => dispatch(cancelAddCourse())}
                className="bg-red-500 text-white text-md font-bold w-24 p-3 rounded-md mt-3 hover:bg-red-700 cursor-pointer"
                />
            <input
                type="submit"
                name="submit"
                value="Save"
                onClick={handleSubmit}
                className="bg-blue-600 text-white text-md font-bold w-24 p-3 rounded-md mt-3 hover:bg-blue-700 cursor-pointer"
                />
          </div>
        </form>
      </div>
      <BackDrop open={isLoading}></BackDrop>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;
