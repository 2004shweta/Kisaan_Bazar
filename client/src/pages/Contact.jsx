import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMobileAlt, FaEnvelopeOpen, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaUserCircle, FaComments } from 'react-icons/fa';
import ContactImg from '../assets/image/Contact.jpg';
import Farmer1 from '../assets/image/farmer1.jpg';
import Farmer2 from '../assets/image/farmer2.jpg';
import Farmer3 from '../assets/image/farmer3.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'
  const [faqOpen, setFaqOpen] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const faqs = [
    {
      q: 'How can I become a seller on Kisaan Bazar?',
      a: 'Click on the "Become a Seller" button or contact us using the form. Our team will guide you through the process.'
    },
    {
      q: 'How do I request a callback?',
      a: 'Fill out the contact form and select "Request a Callback" as your reason. Our team will reach out to you soon.'
    },
    {
      q: 'What services do you offer to contractors?',
      a: 'We connect contractors with verified farmers and buyers. Contact us for partnership opportunities.'
    },
    {
      q: 'Where is Kisaan Bazar located?',
      a: 'We are based in Jalandhar, Punjab. See the map below for our exact location.'
    },
  ];

  const supportTeam = [
    { name: 'Aman Singh', role: 'Support Lead', img: Farmer1 },
    { name: 'Priya Sharma', role: 'Customer Care', img: Farmer2 },
    { name: 'Ravi Kumar', role: 'Tech Support', img: Farmer3 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate a random success/error response
    const isSuccess = Math.random() > 0.2; // 80% chance of success
    if (isSuccess) {
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
      });
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const handleFaqToggle = (idx) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  return (
    <div className="bg-base-200 min-h-screen relative">
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setChatOpen(true)}
        aria-label="Open chat support"
      >
        <FaComments size={28} />
      </button>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 z-50 bg-base-100 p-6 rounded-lg shadow-xl w-80"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Live Help</span>
              <button onClick={() => setChatOpen(false)} className="text-xl">&times;</button>
            </div>
            <div className="text-base-content mb-2">Hi! How can we help you today? (This is a demo chat.)</div>
            <input className="input input-bordered w-full mb-2" placeholder="Type your message..." disabled />
            <button className="btn btn-primary w-full" disabled>Send</button>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="flex flex-col lg:flex-row max-w-6xl mx-auto py-16 px-4 gap-8">
        <div className="flex-1 bg-base-100 rounded-lg shadow-lg p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-3xl font-bold mb-4">Get in Touch with Us</h3>
            <h2 className="text-5xl font-bold mb-4">Contact Us</h2>
            <div className="border-t border-base-300 mb-4">
              <div className="flex justify-center space-x-2 py-2">
                <div className="w-12 h-1 bg-primary"></div>
                <div className="w-12 h-1 bg-primary"></div>
                <div className="w-12 h-1 bg-primary"></div>
              </div>
            </div>
            <p className="text-base-content mb-8">We're here to assist you. Reach out to us for any inquiries or assistance you may need.</p>
          
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex items-center space-x-4">
                <FaMobileAlt className="text-primary text-2xl" />
                <div>
                  <span className="block font-bold">Phone No.</span>
                  <span className="text-base-content">+91-964-768-5675</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelopeOpen className="text-primary text-2xl" />
                <div>
                  <span className="block font-bold">E-mail</span>
                  <span className="text-base-content">kisaanBazaarofficial@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-primary text-2xl" />
                <div>
                  <span className="block font-bold">Address</span>
                  <span className="text-base-content">Tejashwi Nagar Jalandhar Cantt, Jalandhar, Pin Code:- 144005.</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaClock className="text-primary text-2xl" />
                <div>
                  <span className="block font-bold">Opening Hours</span>
                  <span className="text-base-content">Monday - Friday (9:00 AM to 5:00 PM)</span>
                </div>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-8 justify-center">
              <a href="https://wa.me/919647685675" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform"><FaWhatsapp size={28} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform"><FaFacebook size={28} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform"><FaInstagram size={28} /></a>
            </div>
            {/* Support Team Section */}
            <div className="mb-8">
              <h4 className="font-bold text-lg mb-2">Meet Our Support Team</h4>
              <div className="flex space-x-4">
                {supportTeam.map((member, idx) => (
                  <motion.div key={member.name} whileHover={{ scale: 1.08 }} className="flex flex-col items-center">
                    <img src={member.img} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary mb-1" />
                    <span className="font-semibold text-sm">{member.name}</span>
                    <span className="text-xs text-base-content/70">{member.role}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 bg-base-100 rounded-lg shadow-lg p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full" placeholder="First Name" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full" placeholder="Last Name" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" placeholder="E-mail" required />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input input-bordered w-full" placeholder="Phone" />
              </div>
              <select name="reason" value={formData.reason} onChange={handleChange} className="select select-bordered w-full" required>
                <option value="">Select Reason</option>
                <option value="Support">Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Feedback">Feedback</option>
                <option value="Request a Callback">Request a Callback</option>
                <option value="Other">Other</option>
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="textarea textarea-bordered" placeholder="Message" required></textarea>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 p-4 rounded-lg text-center ${
                    submitStatus === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Message sent successfully! We will get back to you soon.'
                    : 'Something went wrong. Please try again later.'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* FAQ Accordion */}
          <div className="mt-8">
            <h4 className="font-bold text-lg mb-2">Frequently Asked Questions</h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <motion.div key={faq.q} layout initial={false} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full text-left px-4 py-3 font-semibold bg-base-300 hover:bg-base-200 transition-colors flex justify-between items-center"
                    onClick={() => handleFaqToggle(idx)}
                  >
                    <span>{faq.q}</span>
                    <span>{faqOpen === idx ? '-' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 py-2 bg-base-100"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Map Embed Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h4 className="font-bold text-lg mb-2">Our Location</h4>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Kisaan Bazar Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.019282365654!2d75.5761800754856!3d31.28892077428206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b6e2e2b2b2b%3A0x7e2b2b2b2b2b2b2b!2sJalandhar%2C%20Punjab%20144005!5e0!3m2!1sen!2sin!4v1695300000000!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;