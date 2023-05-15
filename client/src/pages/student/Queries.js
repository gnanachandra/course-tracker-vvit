import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { warningToast } from "../../utils/toastHelper";
import { Navigate } from "react-router-dom";
import QueryBackDrop from "../../utils/QueryBackDrop";
import {handleRaiseQuery} from "../../features/student/studentSlice";
const Queries = () => {
  const { showQueryBackDrop } = useSelector((store) => store["student"]);
  const { isLoggedIn } = useSelector((store) => store["student"]);
  const dispatch = useDispatch();
  if (!isLoggedIn) {
    warningToast("Login to access !");
    return <Navigate to="/login" />;
  }

  return (
    <section className="p-10">
      {/* Raise query button */}
      <div className="flex justify-end">
        <input
          type="button"
          name="raise query"
          value="Raise Query"
          className="cursor-pointer bg-blue-500 text-white font-bold text-lg absolute p-3 rounded-md"
          onClick={()=>dispatch(handleRaiseQuery())}
        />
      </div>
      {/* View raised querires */}
      <div></div>
      <QueryBackDrop open={showQueryBackDrop} />
    </section>
  );
};

export default Queries;
