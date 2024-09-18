import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    description: '',
    plants: [],
    amount: '',
    quantity: '',
    isActive: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Assuming token is stored in localStorage
  const token = localStorage.getItem('token'); // Replace with your method of getting the token

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show the modal on form submission
  };

  const handleConfirm = async () => {
    try {
      await axios.post('http://localhost:5000/api/posts/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Form Data Submitted:', formData);
      alert('Posted successfully!'); 
      setIsModalOpen(false);
      // Optionally, reset form data after successful submission
      setFormData({
        mobileNumber: '',
        description: '',
        plants: [],
        amount: '',
        quantity: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if necessary
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 text-white text-center py-4">
          <h2 className="text-2xl font-bold">Create New Post</h2>
          <p className="text-sm">Add your produce details here</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-900">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#0ca712] focus:ring-[#0ca712] sm:text-sm"
                placeholder="123-456-7890"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-900">Amount(₹/Kg)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#0ca712] focus:ring-[#0ca712] sm:text-sm"
                placeholder="Amount"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">Quantity(Kg)</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#0ca712] focus:ring-[#0ca712] sm:text-sm"
                placeholder="Quantity"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#0ca712] focus:ring-[#0ca712] sm:text-sm"
                placeholder="Describe the post"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="plants" className="block text-sm font-medium text-gray-900">Plants</label>
              <input
                type="text"
                id="plants"
                name="plants"
                value={formData.plants}
                onChange={(e) => setFormData({ ...formData, plants: e.target.value.split(',') })}
                required
                className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-[#0ca712] focus:ring-[#0ca712] sm:text-sm"
                placeholder="Plant names, separated by commas"
              />
            </div>

            <div className="flex-1 flex items-center space-x-2">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-[#0ca712] focus:ring-[#0ca712]"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-900">Active</label>
            </div>
          </div>

          <div className="flex justify-end gap-x-6 mt-4">
            <button
              type="button"
              className="text-sm font-semibold text-gray-900"
              onClick={() => setFormData({
                mobileNumber: '',
                description: '',
                plants: [],
                amount: '',
                quantity: '',
                isActive: true
              })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#0ca712] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0a9612] focus:outline-none focus:ring-2 focus:ring-[#0ca712]"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h3 className="text-lg font-semibold">Confirm Submission</h3>
            <p className="mt-2">Are you sure you want to submit this form?</p>
            <div className="mt-4 flex justify-end gap-x-4">
              <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleConfirm} className="bg-[#0ca712] text-white px-4 py-2 rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;