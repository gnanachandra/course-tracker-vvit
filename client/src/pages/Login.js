import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
  };
  return (
    <div className="bg-gray-50 container flex flex-col justify-center items-center min-w-full min-h-screen">
      {/* image div */}
      <div>
        <img src="vvit-logo.png" alt="vvit" className="w-auto mx-auto" />
      </div>
      <div className="bg-white mt-6 p-10 rounded-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <form className="flex flex-col gap-y-3">
          <label htmlFor="email" className="font-bold">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:border-cyan-400"
          />
          <label for="password" className="font-bold font">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:border-cyan-400"
          />
          <input
            type="submit"
            name="submit"
            value="Login"
            onClick={handleSubmit}
            className="bg-blue-600 text-white text-md font-bold p-3 rounded-md mt-3 hover:bg-blue-700 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
