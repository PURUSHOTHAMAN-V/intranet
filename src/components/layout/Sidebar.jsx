import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  CalendarOutlined,
  FolderOpenOutlined,
  MessageOutlined,
  SettingOutlined,
  BookOutlined,
  BarChartOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.module.css';

const { Sider } = Layout;

const adminMenu = [
  { key: 'dashboard', icon: <HomeOutlined />, label: 'Dashboard', path: '/' },
  { key: 'user-management', icon: <TeamOutlined />, label: 'User Management', path: '/user-management' },
  { key: 'departments', icon: <ApartmentOutlined />, label: 'Department Modules', path: '/departments' },
  { key: 'internships', icon: <BookOutlined />, label: 'Internships', path: '/internships' },
  { key: 'workshops', icon: <BarChartOutlined />, label: 'Workshops', path: '/workshops' },
  { key: 'reports', icon: <FileTextOutlined />, label: 'Reports', path: '/reports' },
  { key: 'leave', icon: <CalendarOutlined />, label: 'Leave Management', path: '/leave' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings', path: '/settings' },
];

const userMenu = [
  { key: 'dashboard', icon: <HomeOutlined />, label: 'Dashboard', path: '/' },
  { key: 'profile', icon: <UserOutlined />, label: 'My Profile', path: '/profile' },
  { key: 'departments', icon: <ApartmentOutlined />, label: 'My Department', path: '/departments' },
  { key: 'attendance', icon: <UserOutlined />, label: 'Attendance', path: '/attendance' },
  { key: 'reports', icon: <FileTextOutlined />, label: 'My Reports', path: '/reports' },
  { key: 'leave', icon: <CalendarOutlined />, label: 'My Leave', path: '/leave' },
];

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role === 'NewUser') return null;
  const menuItems = role === 'Admin' ? adminMenu : userMenu;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={220} style={{ background: 'var(--white)', boxShadow: '2px 0 8px rgba(30,58,138,0.04)' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems.map(item => ({
          ...item,
          onClick: () => navigate(item.path),
        }))}
      />
    </Sider>
  );
};

export default Sidebar; 