import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaTractor, FaSeedling, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import FarmerImg from '../assets/image/farmer2.jpg';

const roleAvatar = (role) => {
  if (role === 'farmer') return <FaSeedling className="text-green-600 text-5xl mx-auto mb-2" />;
  if (role === 'contractor') return <FaTractor className="text-yellow-600 text-5xl mx-auto mb-2" />;
  return <FaUserAlt className="text-primary text-5xl mx-auto mb-2" />;
};

const ClassicInput = ({ icon, label, type, name, value, onChange, ...rest }) => {
  const id = `input-${name}`;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-gray-700 font-semibold">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="input input-bordered w-full pl-10 bg-white/70 focus:bg-white/90 focus:ring-2 focus:ring-primary/40 transition"
          placeholder={label}
          autoComplete="off"
          {...rest}
        />
      </div>
    </div>
  );
};

const LoginAndSignup = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const url = isLogin
        ? '/api/auth/login'
        : '/api/auth/register';
      const { data } = await axios.post(url, formData);
      localStorage.setItem('token', data.token);

      // Decode token to get role
      const token = data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(payload));
      setIsAuthenticated(true);
      
      if (role === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (role === 'contractor') {
        navigate('/contractor-dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-100 via-white to-yellow-100">
      {/* Left: Image & Branding */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 relative bg-gradient-to-br from-green-200/80 to-yellow-100/60">
        <img
          src={FarmerImg}
          alt="Farmers"
          className="rounded-3xl shadow-2xl w-80 h-80 object-cover mb-8 border-4 border-white/80"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-2 drop-shadow-lg text-center">
          Kisaan Bazaar
        </h1>
        <p className="text-lg md:text-2xl text-green-700 text-center max-w-md mb-4">
          Empowering Farmers & Contractors to connect, trade, and grow together.
        </p>
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs opacity-70">
          © 2024 Kisaan Bazaar
        </div>
      </div>
      {/* Right: Form Card */}
      <div className="md:w-1/2 flex items-center justify-center p-4 min-h-screen">
        <div
          className="w-full max-w-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-white/60 backdrop-blur-lg z-10"
        >
          <div className="mb-6 text-center">
            {roleAvatar(formData.role)}
            <h2 className="text-2xl font-bold text-green-800 mb-1">
              {isLogin ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Login to access your dashboard' : 'Sign up to join Kisaan Bazaar'}
            </p>
          </div>
          {/* Social Login Buttons (visual only) */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 btn btn-outline border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-400 transition"><FaGoogle className="mr-2" /> Google</button>
            <button className="flex-1 btn btn-outline border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition"><FaFacebook className="mr-2" /> Facebook</button>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            {!isLogin && (
              <ClassicInput
                icon={<FaUserAlt />}
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <ClassicInput
              icon={<FaEnvelope />}
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label htmlFor="input-password" className="block mb-1 text-gray-700 font-semibold">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-white/70 focus:bg-white/90 focus:ring-2 focus:ring-primary/40 transition"
                  placeholder="Password"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {!isLogin && (
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaTractor /></span>
                <select
                  name="role"
                  className="select select-bordered w-full pl-10 bg-white/70 focus:bg-white/90 focus:ring-2 focus:ring-primary/40 transition"
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
              <div className="text-error text-center my-2">
                {errorMessage}
              </div>
            )}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="form-control mt-4 text-center">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                className="btn-link no-underline font-semibold text-primary hover:underline transition"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMessage('');
                  setFormData({ email: '', password: '', name: '', role: '' });
                }}
              >
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