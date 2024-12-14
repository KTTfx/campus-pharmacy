import React from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Header } from '../../components/admin/Header';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header adminName="Admin User" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <DashboardStats />
            
            {/* Recent Activity Section */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h2>
              <div className="bg-white shadow-sm rounded-lg">
                {/* Add your activity list or table here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};