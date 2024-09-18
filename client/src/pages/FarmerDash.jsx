import React, { useState, useEffect } from 'react';

function FarmerDash() {
  const [farmer, setFarmer] = useState({ name: '', email: '' });
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Fetch farmer details and bids here
    fetchFarmerDetails();
    fetchBids();
  }, []);

  const fetchFarmerDetails = async () => {
    // Replace with your API call
    const farmerData = {
      name: 'Madhav Verma',
      email: 'madhav@example.com'
    };
    setFarmer(farmerData);
  };

  const fetchBids = async () => {
    // Replace with your API call
    const bidsData = [
      { id: 1, productName: 'Tomatoes', contractor: 'Kisan Kumar', amount: '₹500' },
      { id: 2, productName: 'Potatoes', contractor: 'Suraj Singh', amount: '₹600' },
      { id: 3, productName: 'Wheat, Rice', contractor: 'Sitaram Chand', amount: '₹550' },
      { id: 4, productName: 'Tomatoes', contractor: 'Kisan Kumar', amount: '₹500' },
      { id: 5, productName: 'Potatoes', contractor: 'Suraj Singh', amount: '₹600' },
      { id: 6, productName: 'Tomatoes', contractor: 'Kisan Kumar', amount: '₹500' }      // Add more bids as needed
    ];
    setBids(bidsData);
  };

  const handleLogout = () => {
    // Implement logout functionality
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Farmer Details at the top */}
      <div className="bg-blue-100 p-4 mb-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Farmer: {farmer.name}</h1>
          <p className="text-lg">Email: {farmer.email}</p>
        </div>
      </div>

      {/* Bidding Options */}
      <div className="flex-grow container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bids.map(bid => (
            <div key={bid.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{bid.productName}</h2>
                <p>Freshly harvested produce available for sale.</p>
                <div className="mb-4">
                  <p className="font-semibold">Contractor: {bid.contractor}</p>
                  <p className="text-gray-600">Amount Offered: {bid.amount}</p>
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

export default FarmerDash;