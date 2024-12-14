import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaPills, FaClinicMedical, FaShoppingCart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
  { path: '/admin/dashboard', icon: FaChartBar, label: 'Dashboard' },
  { path: '/admin/products', icon: FaPills, label: 'Manage Products' },
  { path: '/admin/pharmacies', icon: FaClinicMedical, label: 'Manage Pharmacies' },
  { path: '/admin/orders', icon: FaShoppingCart, label: 'Orders/Bookings' },
  { path: '/admin/settings', icon: FaCog, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Portal</h2>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700"
      >
        <FaSignOutAlt className="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  );
};