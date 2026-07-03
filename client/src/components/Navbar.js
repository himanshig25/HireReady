import React from 'react';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
      <a href="/dashboard" className="text-xl font-bold text-blue-900">
        HireReady
      </a>
      <div className="flex items-center gap-4">
        <a href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">
          Dashboard
        </a>
        <a href="/optimize" className="text-sm text-gray-600 hover:text-blue-600">
          Optimize
        </a>
        <a href="/history" className="text-sm text-gray-600 hover:text-blue-600">
          History
        </a>
        <span className="text-sm text-gray-400">|</span>
        <span className="text-sm text-gray-700">{user ? user.name : ''}</span>
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-gray-700 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;