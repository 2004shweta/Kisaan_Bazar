import React, { useState, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown, FaSearch, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState({});
  const answerRefs = useRef([]);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    setTimeout(() => {
      if (activeIndex !== index && answerRefs.current[index]) {
        answerRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  const handleFeedback = (index, type) => {
    setFeedback((prev) => ({ ...prev, [index]: type }));
  };

  const filteredFaqs = faqData.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-10 px-2 overflow-x-hidden">
      {/* Decorative SVG */}
      <svg className="absolute top-0 left-0 w-96 h-40 opacity-10 pointer-events-none" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="50" rx="200" ry="50" fill="#bbf7d0" />
      </svg>
      <div className="flex justify-center items-start my-2 z-10 relative">
        <div className="w-full sm:w-10/12 md:w-2/3 lg:w-1/2 my-1">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/90 rounded-3xl shadow-2xl border border-green-100 px-6 py-8 mb-8 relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaQuestionCircle className="text-green-500 text-3xl drop-shadow" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow-lg tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="flex items-center gap-2 bg-base-100 rounded-lg shadow-sm px-3 py-2 mb-6 border border-base-200">
              <FaSearch className="text-primary" />
              <input
                type="text"
                className="input input-bordered w-full bg-transparent focus:bg-white"
                placeholder="Search FAQs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <ul className="flex flex-col divide-y divide-green-50">
              {filteredFaqs.length === 0 && (
                <li className="text-center text-base-content/70 py-8">No FAQs found.</li>
              )}
              {filteredFaqs.map((item, index) => {
                const realIndex = faqData.findIndex(f => f.question === item.question);
                return (
                  <motion.li
                    key={index}
                    className="bg-gradient-to-br from-green-50 via-white to-green-100 my-2 shadow-md rounded-2xl border border-green-100 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.015, boxShadow: '0 6px 32px rgba(34,197,94,0.10)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2
                      tabIndex={0}
                      onClick={() => toggleIndex(realIndex)}
                      onKeyDown={e => handleKeyDown(e, realIndex)}
                      className={`flex flex-row justify-between items-center font-semibold px-5 py-4 cursor-pointer rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 text-lg md:text-xl ${activeIndex === realIndex ? 'bg-green-100/60 text-green-700' : 'hover:bg-green-50/60'}`}
                      aria-expanded={activeIndex === realIndex}
                    >
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                        {item.question}
                      </span>
                      <motion.svg
                        className="fill-current text-primary h-7 w-7"
                        viewBox="0 0 20 20"
                        animate={{ rotate: activeIndex === realIndex ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                      </motion.svg>
                    </h2>
                    <AnimatePresence initial={false}>
                      {activeIndex === realIndex && (
                        <motion.div
                          ref={el => (answerRefs.current[realIndex] = el)}
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="border-l-4 border-green-300/60 overflow-hidden bg-white/90 rounded-b-2xl"
                          tabIndex={-1}
                        >
                          <p className="p-5 text-base-content text-lg leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="flex items-center gap-3 px-5 pb-5 pt-2 border-t border-green-50 bg-green-50/40 rounded-b-2xl">
                            <span className="text-sm text-base-content/70 font-medium">Was this helpful?</span>
                            <button
                              className={`btn btn-xs btn-ghost rounded-full border border-green-200 shadow-sm ${feedback[realIndex] === 'up' ? 'text-green-600 bg-green-100' : ''}`}
                              onClick={() => handleFeedback(realIndex, 'up')}
                              aria-label="Mark as helpful"
                            >
                              <FaThumbsUp />
                            </button>
                            <button
                              className={`btn btn-xs btn-ghost rounded-full border border-red-200 shadow-sm ${feedback[realIndex] === 'down' ? 'text-red-600 bg-red-100' : ''}`}
                              onClick={() => handleFeedback(realIndex, 'down')}
                              aria-label="Mark as not helpful"
                            >
                              <FaThumbsDown />
                            </button>
                            {feedback[realIndex] && (
                              <span className="text-xs ml-2 text-primary font-semibold">
                                {feedback[realIndex] === 'up' ? 'Thanks for your feedback!' : 'We appreciate your feedback!'}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

const faqData = [
  {
    question: 'When will my order arrive?',
    answer: 'Shipping time is set by our delivery partners, according to the delivery method chosen by you. Additional details can be found in the order confirmation.'
  },
  {
    question: 'How do I track my order?',
    answer: "Once shipped, you'll get a confirmation email that includes a tracking number and additional information regarding tracking your order."
  },
  {
    question: "What's your return policy?",
    answer: "We allow the return of all items within 30 days of your original order's date. If you're interested in returning your items, send us an email with your order number and we'll ship a return label."
  },
  {
    question: 'How do I make changes to an existing order?',
    answer: 'Changes to an existing order can be made as long as the order is still in "processing" status. Please contact our team via email and we\'ll make sure to apply the needed changes. If your order has already been shipped, we cannot apply any changes to it. If you are unhappy with your order when it arrives, please contact us for any changes you may require.'
  },
  {
    question: 'What shipping options do you have?',
    answer: 'Through various delievery channnels.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Any method of payments acceptable by you. For example: We accept MasterCard, Visa, UPI, Direct Transfer etc.'
  }
];

export default FAQ;
