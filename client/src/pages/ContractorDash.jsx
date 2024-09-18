// src/pages/ContractorDash.js
import React, { useState, useEffect } from 'react';

function ContractorDash() {
  const [contractor, setContractor] = useState({ name: '', email: '' });
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Fetch contractor details and contracts here
    fetchContractorDetails();
    fetchContracts();
  }, []);

  const fetchContractorDetails = async () => {
    // Replace with your API call
    const contractorData = {
      name: 'Rajiv Sharma',
      email: 'rajiv@example.com',
    };
    setContractor(contractorData);
  };

  const fetchContracts = async () => {
    // Replace with your API call
    const contractsData = [
      { id: 1, productName: 'Tomatoes', farmer: 'Madhav Verma', amount: '₹500' },
      { id: 2, productName: 'Potatoes', farmer: 'Anil Kumar', amount: '₹600' },
      { id: 3, productName: 'Wheat', farmer: 'Ram Singh', amount: '₹550' },
      { id: 4, productName: 'Rice', farmer: 'Pawan Patel', amount: '₹700' },
      { id: 5, productName: 'Onions', farmer: 'Mohan Lal', amount: '₹400' },
      { id: 6, productName: 'Carrots', farmer: 'Suresh Pandey', amount: '₹450' },
    ];
    setContracts(contractsData);
  };

  const handleLogout = () => {
    // Implement logout functionality
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contractor Details at the top */}
      <div className="bg-blue-100 p-4 mb-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Contractor: {contractor.name}</h1>
          <p className="text-lg">Email: {contractor.email}</p>
        </div>
      </div>

      {/* Contracts */}
      <div className="flex-grow container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{contract.productName}</h2>
                <p>Available contract for {contract.productName}.</p>
                <div className="mb-4">
                  <p className="font-semibold">Farmer: {contract.farmer}</p>
                  <p className="text-gray-600">Amount Offered: {contract.amount}</p>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn bg-green-300">Accept</button>
                  <button className="btn bg-red-300">Decline</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button at bottom right */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <button
            className="btn bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContractorDash;
