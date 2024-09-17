import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar"; // Adjust path if necessary

import LoginAndSignup from "./pages/LoginandSignup"; // Adjust path if necessary
import Home from "./pages/Home";         // Ensure this is correct
import FAQ from "./pages/FAQ";           // Ensure this is correct
import Contact from "./pages/Contact";   // Ensure this is correct

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginAndSignup />} />
        <Route path="/signup" element={<LoginAndSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
