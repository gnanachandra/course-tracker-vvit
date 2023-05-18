import React from "react";
import { cancelRaiseQuery, raiseQuery, uploadToCloud } from "../../features/student/studentSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackDrop from "../../utils/BackDrop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RaiseQuery = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const {isLoading} = useSelector((store)=>store["student"]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const response = await dispatch(uploadToCloud(file));
    setForm({ ...form, [e.target.name]: response.payload[0] });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log("Query Form : ",form);
		const response = await dispatch(raiseQuery(form));	
		console.log("Response : ",response);
		if(response.payload.status === "success")
		{
			navigate("/queries");
		}
	}

	
  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-y-5 bg-gray-100  p-10">
        <div className="w-auto">
          <form className="grid sm:grid-cols-1 gap-x-10 gap-y-4">
            <h2 className="font-bold text-black text-xl text-center">
              Raise Query
            </h2>
            <div className="flex  justify-center gap-y-2 flex-col">
              <label className="font-semibold text-black" htmlFor="query title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="text-black rounded-md"
              />
            </div>

            <div className="flex  justify-center gap-y-2 flex-col">
              <label className="font-semibold text-black" htmlFor="query description">
                Description
              </label>
              <textarea name="description" className="text-black rounded-md" rows={"5"} onChange={handleFormChange}/>
            </div>

            <div className="flex  justify-center gap-y-2 flex-col">
              <label className="font-semibold text-black" htmlFor="image">
                Error Image
              </label>
							<input type="file" name="image" onChange={handleFileUpload} className="text-black"/>
            </div>
            <div className="flex justify-center gap-x-5 px-8">
              <input
                type="button"
                name="cancel"
                value="Cancel"
                onClick={()=>dispatch(cancelRaiseQuery())}
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
    </div>
  );
};

export default RaiseQuery;
