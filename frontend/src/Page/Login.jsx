import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/listuser");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center ">
      <div className="bg-white dark:bg-gray-800 rounded-md p-8 shadow-md w-full max-w-sm">
        <h1 className="text-4xl mb-5 font-extrabold text-gray-800 dark:text-white text-center">
          Login
        </h1>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <form onSubmit={loginUser} className="space-y-4">
          <div className="flex items-center">
            <label className="text-xl font-bold w-32">Email: </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black rounded-lg p-2 flex-1 font-mono"
            />
          </div>
          <div className="flex items-center">
            <label className="text-xl font-bold w-32">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black rounded-lg p-2 flex-1 font-mono"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
