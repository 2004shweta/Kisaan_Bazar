import React, { useState } from "react";
import axios from "axios";

const LoginAndSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");  // Clear error message when toggling forms
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";
        
      // Send a POST request with form data
      const { data } = await axios.post(url, formData);

      // Handle successful response
      console.log("Response:", data);
      // Optionally save JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect or perform other actions after successful login/signup
      alert("Success!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : "Something went wrong!");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="farmer">Farmer</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center my-2">
                {errorMessage}
              </div>
            )}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#0ca712", borderColor: "#0ca712" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="form-control mt-4 text-center">
            <p>
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <a href="#" onClick={handleToggle} style={{ color: "#0ca712" }}>
                {isLogin ? "Sign Up" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignup;
