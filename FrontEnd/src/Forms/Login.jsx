import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Remove the square brackets around event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Check if any of the required fields is empty
    if (!values.email || !values.password) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      console.log("Sending data:", values);
      const res = await axios.post("http://localhost:8080/login", values);
      if (res.data.login) {
        navigate("/");
      } else {
        console.log("Password or email not matched");
      }
    } catch (err) {}
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 w-screen h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center" action="post">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 gap-3 flex flex-row items-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your Password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success bg-slate-400 text-black"
          >
            Login
          </button>
        </form>
        <div className="gap-2 flex flex-row ">
          <span>If you do not have an account</span>
          <Link to="/signUp" className="font-semibold text-purple-500">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
