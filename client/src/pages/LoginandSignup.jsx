import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndSignup = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? 'https://kisaan-bazar.onrender.com/api/auth/login'
        : 'https://kisaan-bazar.onrender.com/api/auth/register';

      const { data } = await axios.post(url, formData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Something went wrong!');
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      {/* Improved Animated Earth */}
      <div className="relative w-80 h-80 mr-8 hidden lg:block">
        <div className="absolute inset-0">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
            {/* Ocean Base */}
            <circle cx="100" cy="100" r="90" fill="#1d4ed8" className="opacity-20"/>
            <circle cx="100" cy="100" r="90" fill="#2563eb" className="opacity-30"/>
            
            {/* Continents */}
            {/* North America */}
            <path
              fill="#15803d"
              d="M50,70 C55,60 70,55 80,50 C90,45 95,40 100,45 C105,50 110,55 105,65 C100,75 90,80 80,85 C70,90 60,85 55,80 C50,75 45,80 50,70"
              className="opacity-90"
            />
            
            {/* South America */}
            <path
              fill="#16a34a"
              d="M75,100 C80,95 85,90 90,95 C95,100 100,105 95,115 C90,125 85,130 80,125 C75,120 70,115 75,100"
              className="opacity-90"
            />
            
            {/* Europe */}
            <path
              fill="#15803d"
              d="M110,60 C115,55 125,50 130,55 C135,60 140,65 135,70 C130,75 125,80 120,75 C115,70 105,65 110,60"
              className="opacity-90"
            />
            
            {/* Africa */}
            <path
              fill="#16a34a"
              d="M115,80 C120,75 130,70 140,75 C150,80 155,90 150,100 C145,110 135,115 125,110 C115,105 110,95 115,80"
              className="opacity-90"
            />
            
            {/* Asia */}
            <path
              fill="#15803d"
              d="M145,60 C150,55 160,50 170,55 C180,60 185,70 180,80 C175,90 165,95 155,90 C145,85 140,65 145,60"
              className="opacity-90"
            />
            
            {/* Australia */}
            <path
              fill="#16a34a"
              d="M160,120 C165,115 175,110 180,115 C185,120 190,125 185,130 C180,135 170,140 165,135 C160,130 155,125 160,120"
              className="opacity-90"
            />
            
            {/* Cloud-like atmosphere effect */}
            <circle cx="100" cy="100" r="90" fill="white" className="opacity-10"/>
          </svg>
        </div>
      </div>

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
                style={{ backgroundColor: '#0ca712', borderColor: '#0ca712' }}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="form-control mt-4 text-center">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button className="btn-link no-underline" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignup;