import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { Login, ForgotPassword, ResetPassword } from './pages/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import { Profile } from './pages/Profile';
import { UserManagement } from './pages/UserManagement';
import { UserDepartment } from './pages/Departments';
import Internships, { ApplyInternship } from './pages/Internships';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Leave from './pages/Leave';
import AdminLeave from './pages/Leave/AdminLeave';
import AdminWorkshop from './pages/Workshops/AdminWorkshop';
import UserWorkshop from './pages/Workshops/UserWorkshop';
import Settings from './pages/Settings';
import { useAuth } from './contexts/AuthContext';

const Placeholder = ({ title }) => (
  <div style={{ padding: 32, textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Page content coming soon...</p>
  </div>
);

function WorkshopRoute() {
  const { role } = useAuth();
  if (role === 'Admin') return <AdminWorkshop />;
  if (role === 'NewUser') return <UserWorkshop />;
  return <Placeholder title="Workshops" />;
}

function LeaveRoute() {
  const { role } = useAuth();
  if (role === 'Admin') return <AdminLeave />;
  return <Leave />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/internships/apply" element={<ApplyInternship />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="departments" element={<UserDepartment />} />
            <Route path="internships" element={<Internships />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="workshops" element={<WorkshopRoute />} />
            <Route path="leave" element={<LeaveRoute />} />
            <Route path="documents" element={<Placeholder title="Documents" />} />
            <Route path="communications" element={<Placeholder title="Communications" />} />
            <Route path="resources" element={<Placeholder title="Resource Booking" />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
