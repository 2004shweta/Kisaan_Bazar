import React, { useState, useEffect } from 'react';
import { FaUserTie, FaLeaf, FaHandshake, FaRupeeSign, FaCheckCircle, FaClock, FaTruck, FaCheck } from 'react-icons/fa';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < fullStars
              ? 'text-yellow-400'
              : index === fullStars && hasHalfStar
              ? 'text-yellow-400'
              : 'text-gray-300'
          }`}
        >
          {index < fullStars || (index === fullStars && hasHalfStar) ? '★' : '☆'}
        </span>
      ))}
      <span className="ml-2 text-green-700 font-semibold text-sm">{rating.toFixed(1)}</span>
    </div>
  );
}

function ContractorDash() {
  const [contractor, setContractor] = useState({ name: '', email: '' });
  const [contracts, setContracts] = useState([]);
  const [successfulContracts, setSuccessfulContracts] = useState([]);
  const [ongoingDeals, setOngoingDeals] = useState([]);

  useEffect(() => {
    fetchContractorDetails();
    fetchContracts();
    fetchSuccessfulContracts();
    fetchOngoingDeals();
  }, []);

  const fetchContractorDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case where token is not available
      return;
    }

    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContractor({ name: data.name, email: data.email });
      } else {
        console.error('Failed to fetch contractor details');
      }
    } catch (error) {
      console.error('Error fetching contractor details:', error);
    }
  };

  const fetchContracts = async () => {
    // This fetches all posts, which are considered "Available Contracts"
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns an array of posts
        // Mapping post data to contract format
        const formattedContracts = data.map(post => ({
          id: post._id,
          productName: post.plants.join(', ') || 'N/A',
          farmer: post.farmerName,
          amount: `₹${post.amount}`,
        }));
        setContracts(formattedContracts);
      } else {
        console.error('Failed to fetch contracts');
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  const fetchSuccessfulContracts = async () => {
    // TODO: Replace with your API call when backend is ready
    const successfulContractsData = [
      { id: 1, productName: 'Tomatoes', farmer: 'Madhav Verma', rating: 4.5, weight: 500 },
      { id: 2, productName: 'Potatoes', farmer: 'Anil Kumar', rating: 5, weight: 1000 },
      { id: 3, productName: 'Wheat', farmer: 'Ram Singh', rating: 4, weight: 2000 },
      { id: 4, productName: 'Rice', farmer: 'Pawan Patel', rating: 4.8, weight: 1500 },
    ];
    setSuccessfulContracts(successfulContractsData);
  };

  const fetchOngoingDeals = async () => {
    // TODO: Replace with your API call when backend is ready
    const ongoingDealsData = [
      { id: 1, productName: 'Apples', farmer: 'Vikram Yadav', closedDate: '2024-05-15', expectedCompletion: '2024-09-15', status: 'In Progress' },
      { id: 2, productName: 'Grapes', farmer: 'Sanjay Gupta', closedDate: '2024-06-01', expectedCompletion: '2024-08-30', status: 'Pending Delivery' },
      { id: 3, productName: 'Mangoes', farmer: 'Priya Sharma', closedDate: '2024-05-20', expectedCompletion: '2024-07-20', status: 'Quality Check' },
    ];
    setOngoingDeals(ongoingDealsData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Status chip color logic
  const statusChip = (status) => {
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    if (status === 'Pending Delivery') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Quality Check') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-400 via-green-200 to-green-100 py-8 shadow-lg mb-8 rounded-b-3xl overflow-hidden">
        {/* Decorative SVG */}
        <svg className="absolute top-0 left-0 w-64 h-32 opacity-10" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="50" rx="200" ry="50" fill="#bbf7d0" />
        </svg>
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6 px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-lg border-4 border-white">
              <FaUserTie className="text-green-600 text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-1 drop-shadow-lg">Contractor Dashboard</h1>
              <p className="text-base md:text-lg text-green-800 font-semibold">Welcome, <span className="font-bold">{contractor.name}</span></p>
              <p className="text-green-700">{contractor.email}</p>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Available Contracts */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center gap-2"><FaHandshake className="text-green-500" /> Available Contracts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contracts.map((contract, idx) => (
            <div key={contract.id} className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative group">
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow group-hover:bg-green-200 transition">NEW</span>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <FaLeaf className="text-green-400 text-2xl" />
                  <h3 className="text-2xl font-bold text-green-800">{contract.productName}</h3>
                </div>
                <p className="text-green-700 mb-2 flex items-center gap-2"><FaUserTie className="text-green-400" /> Farmer: <span className="font-semibold">{contract.farmer}</span></p>
                <p className="text-green-600 mb-4 flex items-center gap-2"><FaRupeeSign className="text-green-400" /> Amount Offered: <span className="font-semibold">{contract.amount}</span></p>
                <div className="flex justify-end gap-2 mt-auto">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold shadow hover:bg-green-600 transition">Accept</button>
                  <button className="px-4 py-2 bg-red-400 text-white rounded-full font-semibold shadow hover:bg-red-500 transition">Decline</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Deals Table */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center gap-2"><FaClock className="text-green-500" /> Ongoing Deals</h2>
        <div className="bg-white shadow-xl rounded-3xl border border-green-100 overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-green-100">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Closed Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Expected Completion</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-50">
              {ongoingDeals.map((deal, idx) => (
                <tr key={deal.id} className={idx % 2 === 0 ? 'bg-green-50/60' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-800">{deal.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-700">{deal.farmer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">{deal.closedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">{deal.expectedCompletion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${statusChip(deal.status)}`}>
                      {deal.status === 'In Progress' && <FaClock className="inline mr-1" />}
                      {deal.status === 'Pending Delivery' && <FaTruck className="inline mr-1" />}
                      {deal.status === 'Quality Check' && <FaCheckCircle className="inline mr-1" />}
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Successful Contracts Table */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center gap-2"><FaCheck className="text-green-500" /> Successful Contracts</h2>
        <div className="bg-white shadow-xl rounded-3xl border border-green-100 overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-green-100">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-50">
              {successfulContracts.map((contract, idx) => (
                <tr key={contract.id} className={idx % 2 === 0 ? 'bg-green-50/60' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-800">{contract.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-700">{contract.farmer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">{contract.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StarRating rating={contract.rating} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContractorDash;