import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    axiosInstance
      .post("/users/register", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (   
  <div
      className="min-h-screen flex items-center justify-center bg-cover bg-black bg-opacity-30"
      style={{
      backgroundImage:
        "url('/bg-image1.jpeg')",
      }}>
    <div className="group relative rounded-2xl p-[2px] duration-500 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.8)]">
      {/* Inner Card */}  
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-7 pt-5 pb-8 max-w-full w-[400px] text-white">
        <h2 className="text-3xl font-poppins font-semibold mb-4 text-left p-1">Register</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-poppins text-lg text-left pl-2" htmlFor="email">
              Email
            </label>
            <input
             onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="p-3 font-poppins text-sm  rounded-xl bg-gray-500 bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-poppins text-lg text-left pl-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="p-3 font-poppins text-sm rounded-xl bg-gray-500 bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[280px] h-[46px] font-poppins text-base bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-full mt-4"
            >
              Login
            </button>
          </div>
      </form>
        <p className="mt-6 text-center font-poppins text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Register;
