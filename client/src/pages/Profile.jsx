// src/pages/Profile.js
import React from 'react';

const Profile = ({ handleLogout }) => {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p>User Role: {/* Display user role if available */}</p>
          <button 
            className="btn btn-error mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
