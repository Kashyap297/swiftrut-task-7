// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 to-pink-400 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-center text-gray-600 mb-4">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-md w-full"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
