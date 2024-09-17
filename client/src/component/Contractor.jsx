// src/pages/Contractor.js
import React from 'react';

const Contractor = () => {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title">Welcome, Contractor!</h2>
          <p>
            As a contractor, you can manage your projects, view available contracts, and connect with farmers for new opportunities.
          </p>
          <div className="flex flex-col gap-4 mt-4">
            <button className="btn btn-primary">Manage Projects</button>
            <button className="btn btn-secondary">View Contracts</button>
            <button className="btn btn-accent">Connect with Farmers</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contractor;
