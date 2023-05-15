import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getIndividualCourseDetails, updateCourseDetails} from "../../features/student/studentSlice";
import BackDrop from "../../utils/BackDrop";
import { ToastContainer } from "react-toastify";
import { Link, useParams,Navigate, useNavigate } from "react-router-dom";
import { errorToast } from "../../utils/toastHelper";

const EditCourse = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading } = useSelector((store) => store["student"]);
	const [certificateLink,setCertificateLink] = useState("");

  // useEffect(() => {
  //   dispatch(getIndividualCourseDetails({ id }));
  // }, [dispatch,id]);


  const handleSubmit = async(e) => {
    e.preventDefault();
		if(certificateLink === "")
    {
      errorToast("Enter Certificate Link")
    }
		const response =await dispatch(updateCourseDetails({id,certificateLink}))
		if(response.payload.status === "success")
		{
			navigate("/courses");
		}
  };

  return (
    <div className="flex items-center justify-center flex-col gap-y-5 bg-gray-100  p-10">
      <div className="w-auto">
        <form className="grid sm:grid-cols-1 gap-x-10 gap-y-4">
          <h2 className="font-bold text-black text-xl text-center">
            Add Certificate Link
          </h2>
          <label htmlFor="certificate link" className="font-semibold">Certificate Link</label>
					<input type="text" name="certificateLink" value={certificateLink} className="rounded-md" onChange={(e)=>setCertificateLink(e.target.value)}/>
          <div className="flex justify-center gap-x-5 px-8">
            <Link to="/courses">
              <input
                type="button"
                name="cancel"
                value="Cancel"
                className="bg-red-500 text-white text-md font-bold w-24 p-3 rounded-md mt-3 hover:bg-red-700 cursor-pointer"
              />
            </Link>
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

export default EditCourse;
