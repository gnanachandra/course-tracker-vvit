import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { warningToast } from "../../utils/toastHelper";
import { Navigate } from "react-router-dom";
import QueryBackDrop from "../../utils/QueryBackDrop";
import {
  getQueries,
  handleRaiseQuery,
} from "../../features/student/studentSlice";
const Queries = () => {
  const { showQueryBackDrop } = useSelector((store) => store["student"]);
  const { isLoggedIn } = useSelector((store) => store["student"]);
  const dispatch = useDispatch();
  const { activeQueries } = useSelector((store) => store["student"]);
  const { resolvedQueries } = useSelector((store) => store["student"]);

  useEffect(() => {
    dispatch(getQueries());
  }, []);

  if (!isLoggedIn) {
    warningToast("Login to access !");
    return <Navigate to="/login" />;
  }

  return (
    <section className="p-10 flex flex-col gap-y-6">
      {/* Raise query button */}
      <div className="flex justify-end">
        <input
          type="button"
          name="raise query"
          value="Raise Query"
          className="cursor-pointer bg-blue-500 text-white font-bold text-lg absolute p-3 rounded-md"
          onClick={() => dispatch(handleRaiseQuery())}
        />
      </div>
      {/* View raised querires */}
      {/* Active Queries */}
      <div className="mt-10">
        <h2 className="font-bold text-xl">Active Queries</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {activeQueries &&
            activeQueries.map((query, index) => {
              return (
                <div className={`grid grid-cols-1 ${query.image !== "" ? "md:grid-cols-2" : "md:grid-cols-1"} md:grid-cols-2 gap-5 bg-white lg:w-4/5 gap-y-4 rounded-xl shadow-lg mt-8 py-8 px-10 md:px-16 mb-4 m-auto hover:shadow-xl`}>
                  {/* Info about query */}
                  <section>
                    <div>
                      <h1 className="font-bold mb-2">Title</h1>
                      <p className="mb-5">{query.title}</p>
                      <h1 className="font-bold mb-2">Description</h1>
                      <p>{query.description}</p>
                    </div>
                  </section>
                  {/* Image of error */}
                  {query.image && (
                    <div className="flex items-center justify-center flex-col">
                      <h2 className="font-bold mb-5">Error Image</h2>
                      <img src={query.image} alt="errorpic" className="h-full w-full cursor-pointer" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {/* Resolved queries */}
      <div className="mt-5">
        <h2 className="font-bold text-xl">Resolved Queries</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
        {
          
          resolvedQueries.map((query,index)=>{
            return (
              <div className={`grid grid-cols-1 ${query.image !== "" ? "md:grid-cols-2" : "md:grid-cols-1"} md:grid-cols-2 gap-5 bg-white lg:w-4/5 gap-y-4 rounded-xl shadow-lg mt-8 py-8 px-10 md:px-16 mb-4 m-auto hover:shadow-xl`}>
                  {/* Info about query */}
                  <section>
                    <div>
                      <h1 className="font-bold mb-2">Title</h1>
                      <p className="mb-5">{query.title}</p>
                      <h1 className="font-bold mb-2">Description</h1>
                      <p className="mb-5">{query.description}</p>
                      <h1 className="font-bold mb-2">Admin Message</h1>
                      <p>{query.adminMessage}</p>
                    </div>
                  </section>
                  {/* Image of error */}
                  {query.image && (
                    <div className="flex items-center justify-center flex-col">
                      <h2 className="font-bold mb-5">Error Image</h2>
                      <img src={query.image} alt="errorpic" className="h-full w-full cursor-pointer" />
                    </div>
                  )}
                </div>
            )
          })
        }
        </div>
      </div>
      <QueryBackDrop open={showQueryBackDrop} />
    </section>
  );
};

export default Queries;
