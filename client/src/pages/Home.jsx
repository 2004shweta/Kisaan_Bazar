import React, { useEffect, useState } from 'react';
import Hero from '../component/Hero'; // Adjust path if necessary
import Farmer from '../component/Farmer'; // Adjust path if necessary
import Contractor from '../component/Contractor'; // Adjust path if necessary
import axios from 'axios'; // Import axios for making API requests
import Testimonials from '../component/Testimonials'; // Adjust path if necessary
import Footer from '../component/Footer';
import News from '../component/News'; // Import the News component
import { FaLeaf, FaHandshake, FaRupeeSign, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaLeaf className="text-green-600 text-4xl mb-4" />,
    title: 'Direct Crop Sales',
    desc: 'Farmers sell their produce directly to buyers, ensuring transparency and better profits.'
  },
  {
    icon: <FaHandshake className="text-green-600 text-4xl mb-4" />,
    title: 'Secure Contracts',
    desc: 'Smart, secure contracts protect both farmers and buyers for every transaction.'
  },
  {
    icon: <FaRupeeSign className="text-green-600 text-4xl mb-4" />,
    title: 'Best Market Prices',
    desc: 'Get the best prices for your crops without middlemen, maximizing your earnings.'
  },
  {
    icon: <FaUsers className="text-green-600 text-4xl mb-4" />,
    title: 'Community Support',
    desc: 'Join a trusted community of farmers and buyers, sharing knowledge and resources.'
  },
];

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Make an API request to verify the token and get the user role
          const response = await axios.get('https://kisaan-bazar.onrender.com/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const role = response.data.role; // Assume role is in the response
          localStorage.setItem('role', role); // Ensure role is stored in localStorage
          setUserRole(role);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        // Optionally, clear token and role from localStorage if there's an error
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      } finally {
        setLoading(false); // Set loading to false after the check is complete
      }
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking the role
  }

  if (userRole === 'farmer') {
    return <Farmer />;
  } else if (userRole === 'contractor') {
    return <Contractor />;
  } else {
    return (
      <div>
        <Hero />
        {/* Features Section */}
        <section className="relative py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-8 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Why Choose Kisaan Bazaar?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-green-100 hover:shadow-2xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ scale: 1.06 }}
                >
                  {feature.icon}
                  <h3 className="text-2xl font-bold mb-2 text-green-700">{feature.title}</h3>
                  <p className="text-gray-600 text-base">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Decorative SVG */}
          <svg className="absolute top-0 left-0 w-64 h-32 opacity-10" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="50" rx="200" ry="50" fill="#bbf7d0" />
          </svg>
        </section>
        <div className="mt-10">
          <Testimonials />
          <News />
          <Footer/>
        </div>
      </div>
    );
  }
};

export default Home;
