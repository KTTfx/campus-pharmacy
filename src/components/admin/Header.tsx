import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

interface HeaderProps {
  adminName: string;
}

export const Header: React.FC<HeaderProps> = ({ adminName }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <FaBell className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <FaUserCircle className="w-8 h-8 text-gray-600" />
            <span className="text-gray-800 font-medium">Welcome, {adminName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};