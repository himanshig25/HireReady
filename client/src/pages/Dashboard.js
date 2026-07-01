import React from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-blue-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {user ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Welcome, {user ? user.name : 'User'}!
          </h2>
          <p className="text-gray-500 mb-6 text-sm">You are logged in successfully.</p>

          
            <a href="/optimize"
            className="block w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium mb-3"
          >
            Optimize Resume
          </a>
        </div>
      </div>
    </>
  );
}

export default Dashboard;