import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar"; // Ensure correct path
import LoginAndSignup from "./pages/LoginandSignup"; // Ensure correct path
import Home from "./pages/Home"; // Ensure correct path
import FAQ from "./pages/FAQ"; // Ensure correct path
import Contact from "./pages/Contact"; // Ensure correct path
import Profile from "./pages/Profile"; // Ensure correct path
import FarmerDash from "./pages/FarmerDash";
import ContractorDash from "./pages/ContractorDash";
import NotFound from "./pages/NotFound"; // Import NotFound component
import PrivateRoute from "./component/common/PrivateRoute"; // Import PrivateRoute component
import { PostProvider } from "./context/PostContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in localStorage to maintain login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div data-theme="kisaan" className="min-h-screen bg-green-50 text-green-900">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Toaster />
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile handleLogout={handleLogout} />
                </PrivateRoute>
              }
            />
            <Route
              path="/farmer-dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <FarmerDash />
                </PrivateRoute>
              }
            />
            <Route
              path="/contractor-dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ContractorDash />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PostProvider>
      </div>
    </Router>
  );
}

export default App;
