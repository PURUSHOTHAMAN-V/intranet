import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminDashboard, UserDashboard } from './index';

const Dashboard = () => {
  const { role } = useAuth();
  if (role === 'Admin') return <AdminDashboard />;
  return <UserDashboard />;
};

export default Dashboard; 