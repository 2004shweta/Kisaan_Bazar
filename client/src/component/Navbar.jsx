import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await handleLogout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-md rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center navbar-start">
            <Link className="text-2xl font-extrabold text-primary no-underline tracking-tight" to="/">
              KisaanBazaar
            </Link>
          </div>

          {/* Nav Links */}
          <div className="navbar-end flex items-center space-x-4">
            <ul className="menu menu-horizontal px-1 hidden lg:flex bg-transparent shadow-none">
              <li>
                <Link
                  to="/"
                  className={`rounded-lg font-semibold transition-colors duration-200 no-underline ${isActive('/') ? 'text-primary underline underline-offset-4' : 'hover:text-primary'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={`rounded-lg font-semibold transition-colors duration-200 no-underline ${isActive('/faq') ? 'text-primary underline underline-offset-4' : 'hover:text-primary'}`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`rounded-lg font-semibold transition-colors duration-200 no-underline ${isActive('/contact') ? 'text-primary underline underline-offset-4' : 'hover:text-primary'}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link className="btn btn-primary btn-sm rounded-full" to="/profile">
                  Profile
                </Link>
                {/* <button className="btn btn-accent btn-sm rounded-full" onClick={logout}>
                  Logout
                </button> */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link className="btn btn-accent btn-sm rounded-full" to="/login">
                  Login
                </Link>
                {/* <Link className="btn btn-secondary btn-sm rounded-full" to="/signup">
                  Sign Up
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
