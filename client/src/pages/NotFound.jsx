import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-8 text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound; 
 