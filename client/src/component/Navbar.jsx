import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          KisaanBazaar
        </Link>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <ul className="menu menu-horizontal px-1 hidden lg:flex space-x-4">
          <li>
            <Link
              to="/"
              className="hover:text-[#0ca712] focus:outline-none no-underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className="hover:text-[#0ca712] focus:outline-none no-underline"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-[#0ca712] focus:outline-none no-underline"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <Link
          className="btn"
          to="/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
