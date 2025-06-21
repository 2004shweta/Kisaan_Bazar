import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Carousel from '../component/Carousel';
import Footer from '../component/Footer';

function FarmerDash() {
  const [farmer, setFarmer] = useState({ name: '', email: '' });
  const [bids, setBids] = useState([]);
  const [successfulContracts, setSuccessfulContracts] = useState([]);
  const [cropSales, setCropSales] = useState([]);
  const [contractorStats, setContractorStats] = useState([]);
  const [ongoingDeals, setOngoingDeals] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    fetchFarmerDetails();
    fetchBids();
    fetchSuccessfulContracts();
    fetchCropSales();
    fetchContractorStats();
    fetchOngoingDeals();
    fetchMonthlySales();
  }, []);

  const fetchFarmerDetails = async () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const farmerData = {
        name: user.name,
        email: user.email
      };
      setFarmer(farmerData);
    }
  };

  const fetchBids = async () => {
    const bidsData = [
      { id: 1, productName: 'Tomatoes', contractor: 'Kisan Kumar', amount: '₹500' },
      { id: 2, productName: 'Potatoes', contractor: 'Suraj Singh', amount: '₹600' },
      { id: 3, productName: 'Wheat, Rice', contractor: 'Sitaram Chand', amount: '₹550' },
    ];
    setBids(bidsData);
  };

  const fetchSuccessfulContracts = async () => {
    const contractsData = [
      { id: 1, crop: 'Wheat', quantity: '100 kg', amount: '₹2000', date: '2024-08-15' },
      { id: 2, crop: 'Rice', quantity: '50 kg', amount: '₹1500', date: '2024-08-20' },
      { id: 3, crop: 'Tomatoes', quantity: '200 kg', amount: '₹3000', date: '2024-08-25' },
    ];
    setSuccessfulContracts(contractsData);
  };

  const fetchCropSales = async () => {
    const salesData = [
      { crop: 'Wheat', quantity: '500 kg', revenue: '₹10000' },
      { crop: 'Rice', quantity: '300 kg', revenue: '₹9000' },
      { crop: 'Tomatoes', quantity: '400 kg', revenue: '₹6000' },
      { crop: 'Potatoes', quantity: '350 kg', revenue: '₹5250' },
    ];
    setCropSales(salesData);
  };

  const fetchContractorStats = async () => {
    const statsData = [
      { contractor: 'Kisan Kumar', contracts: 5, rating: 4.5 },
      { contractor: 'Suraj Singh', contracts: 3, rating: 4.2 },
      { contractor: 'Sitaram Chand', contracts: 2, rating: 4.8 },
    ];
    setContractorStats(statsData);
  };

  const fetchOngoingDeals = async () => {
    const dealsData = [
      { id: 1, productName: 'Wheat', farmer: 'Kisan Kumar', closedDate: '2024-09-01', expectedCompletion: '2024-10-15', status: 'In Progress' },
      { id: 2, productName: 'Rice', farmer: 'Suraj Singh', closedDate: '2024-09-05', expectedCompletion: '2024-10-20', status: 'Pending Delivery' },
      { id: 3, productName: 'Tomatoes', farmer: 'Sitaram Chand', closedDate: '2024-09-10', expectedCompletion: '2024-09-25', status: 'Completed' },
    ];
    setOngoingDeals(dealsData);
  };

  const fetchMonthlySales = async () => {
    const salesData = [
      { month: 'July', wheat: 5000, rice: 4000, tomatoes: 3000, potatoes: 2000 },
      { month: 'August', wheat: 6000, rice: 4500, tomatoes: 3500, potatoes: 2500 },
      { month: 'September', wheat: 5500, rice: 5000, tomatoes: 4000, potatoes: 3000 },
    ];
    setMonthlySales(salesData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-200 via-green-100 to-yellow-100 py-10 shadow-lg mb-8">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-2 drop-shadow-lg text-center">
            Kisaan Bazaar Farmer Dashboard
          </h1>
          <p className="text-lg md:text-2xl text-green-700 text-center max-w-xl mb-2">
            Welcome, <span className="font-bold">{farmer.name}</span>
          </p>
          <p className="text-green-600 text-center">{farmer.email}</p>
        </div>
        {/* Decorative SVG */}
        <svg className="absolute top-0 left-0 w-64 h-32 opacity-10" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="50" rx="200" ry="50" fill="#bbf7d0" />
        </svg>
      </div>
      <div className="container mx-auto px-4 flex-grow space-y-10">
        {/* Carousel */}
        <Carousel/>
        {/* Current Bids */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Current Bids</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids.map(bid => (
              <div key={bid.id} className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-lg text-green-800 mb-1">{bid.productName}</h3>
                <p className="text-sm text-gray-600 mb-2">Freshly harvested produce available for sale.</p>
                <div className="mb-2">
                  <p><span className="font-semibold">Contractor:</span> {bid.contractor}</p>
                  <p><span className="font-semibold">Amount Offered:</span> {bid.amount}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Accept</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Crop Sales Chart */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Crop Sales - Last 3 Months</h2>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wheat" fill="#4ade80" />
                <Bar dataKey="rice" fill="#facc15" />
                <Bar dataKey="tomatoes" fill="#f87171" />
                <Bar dataKey="potatoes" fill="#a3e635" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        {/* Contractor Statistics */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Contractor Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-xl rounded-2xl border border-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-3 text-left">Contractor</th>
                  <th className="p-3 text-left">Successful Contracts</th>
                  <th className="p-3 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {contractorStats.map((stat, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{stat.contractor}</td>
                    <td className="p-3">{stat.contracts}</td>
                    <td className="p-3">{stat.rating} / 5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Ongoing Contracts */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Ongoing Contracts</h2>
          <div className="bg-white shadow-xl rounded-2xl border border-green-100 overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Closed Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Expected Completion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {ongoingDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.farmer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.closedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.expectedCompletion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        deal.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        deal.status === 'Pending Delivery' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Last Month's Successful Contracts */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Last Month's Successful Contracts</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-xl rounded-2xl border border-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-3 text-left">Crop</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {successfulContracts.map(contract => (
                  <tr key={contract.id} className="border-b">
                    <td className="p-3">{contract.crop}</td>
                    <td className="p-3">{contract.quantity}</td>
                    <td className="p-3">{contract.amount}</td>
                    <td className="p-3">{contract.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Total Crop Sales Summary */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Total Crop Sales Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-xl rounded-2xl border border-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-3 text-left">Crop</th>
                  <th className="p-3 text-left">Quantity Sold</th>
                  <th className="p-3 text-left">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {cropSales.map((sale, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{sale.crop}</td>
                    <td className="p-3">{sale.quantity}</td>
                    <td className="p-3">{sale.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Logout Button */}
        <div className="flex justify-end mt-8">
          <button
            className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default FarmerDash;