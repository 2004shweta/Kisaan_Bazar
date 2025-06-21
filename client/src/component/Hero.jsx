import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const phrases = [
  "Empowering Farmers",
  "Direct Crop Sales",
  "Best Market Prices",
  "Trusted by Communities",
  "Connecting Producers & Buyers"
];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayedText.length < phrases[currentPhrase].length) {
        timeout = setTimeout(() => {
          setDisplayedText(
            phrases[currentPhrase].slice(0, displayedText.length + 1)
          );
        }, 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
      } else {
        setTyping(true);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentPhrase]);

  return (
    <div className="hero min-h-screen relative overflow-hidden flex items-center justify-center px-4" style={{background: 'linear-gradient(135deg, #e0ffe7 0%, #f0fff4 100%)'}}>
      {/* Floating SVG shapes */}
      <svg className="absolute top-0 left-0 w-64 h-64 opacity-30 animate-float-slow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="#bbf7d0" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-20 animate-float" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="140" height="140" rx="40" fill="#86efac" />
      </svg>
      <svg className="absolute top-1/2 left-0 w-24 h-24 opacity-20 animate-float-fast" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="50" ry="30" fill="#4ade80" />
      </svg>
      {/* Hero Content */}
      <div className="hero-content text-center relative z-10 flex flex-col items-center justify-center w-full">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-5 text-6xl md:text-7xl font-extrabold text-green-800 drop-shadow-lg"
            variants={itemVariants}
          >
            Kisaan Bazaar
          </motion.h1>
          <motion.div
            key={currentPhrase}
            className="mb-8 h-16 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-lime-400 to-green-700 bg-clip-text text-transparent min-h-[3.5rem] flex items-center justify-center"
            variants={itemVariants}
            aria-label="Dynamic website features"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.div>
          <motion.p className="mb-8 text-lg md:text-2xl text-green-900 font-medium" variants={itemVariants}>
            Removing the Middleman and Enabling Farmers to Sell Their Crops at the Best Price
          </motion.p>
          <motion.a
            href="#explore"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-lime-400 text-white text-2xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 animate-bounce"
            variants={itemVariants}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </motion.div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center">
            <span className="text-green-700 font-semibold mb-1">Scroll Down</span>
            <span className="animate-bounce text-4xl text-green-600">↓</span>
          </div>
        </div>
      </div>
      {/* Floating shapes animation keyframes */}
      <style>{`
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-fast { animation: float 3s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
