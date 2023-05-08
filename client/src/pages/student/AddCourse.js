import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogData } from "../../features/student/studentSlice";
import BackDrop from "../../utils/BackDrop";
import { ToastContainer } from "react-toastify";
const AddCourse = () => {
  const sems = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const { catalog } = useSelector((store) => store["student"]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatalogData());
  }, []);
  const [form, setForm] = useState({
    platform: "",
    course: "",
    semester: "",
  });
  const [platform, setPlatform] = useState("");
  const [courses, setCourses] = useState([]);
  const handlePlatformChange = (e) => {
    const platformName = e.target.value;
    const platform = catalog.find((item) => item.platformName === platformName);
    if (platform) {
      setPlatform(platformName);
      setCourses(platform.courses);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex items-center justify-center flex-col container gap-y-5">
      <div className="w-1/3">
        <form className="grid sm:grid-cols-1 gap-x-10 gap-y-4">
          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold" htmlFor="platform">platform</label>
            <select
              className="p-3 rounded-md shadow-md"
              name="platform"
              onChange={(e) => {
                handleFormChange(e);
                handlePlatformChange(e);
              }}
              defaultValue={"Select Platform"}>
              <option value="Select Platform" key={"-1"} disabled>
                Select Platform
              </option>
              {catalog.map((item, index) => {
                return (
                  <option value={item.platformName} key={index}>
                    {item.platformName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold" htmlFor="courseName">
              Courses
            </label>
            <select
              className="p-3 rounded-md shadow-md"
              name="course"
              onChange={handleFormChange}
              defaultValue={"Select Course"}>
              <option value="Select Course" key={"-1"} disabled>
                Select Course
              </option>
              {courses.map((courseName, index) => {
                return (
                  <option value={courseName} key={index}>
                    {courseName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex  justify-center gap-y-2 flex-col">
            <label className="font-semibold" htmlFor="enrolledIn">
              Enrolled In
            </label>
            <select
              className="p-3 rounded-md shadow-md"
              name="semester"
              onChange={handleFormChange}
              defaultValue={"Select Semester"}>
              <option value="Select Semester" key={"-1"} disabled>
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
                onClick={handleSubmit}
                className="bg-red-500 text-white text-md font-bold w-1/2 p-3 rounded-md mt-3 hover:bg-red-700 cursor-pointer"
                />
            <input
                type="submit"
                name="submit"
                value="Save"
                onClick={handleSubmit}
                className="bg-blue-600 text-white text-md font-bold w-1/2 p-3 rounded-md mt-3 hover:bg-blue-700 cursor-pointer"
                />
          </div>
        </form>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;
