import React from 'react';
import { Layout, Avatar, Badge, Dropdown, Menu, Typography } from 'antd';
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'settings') {
      navigate('/settings');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
      {role === 'Admin' && <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>}
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="header" style={{ background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <img src={logo} alt="Company Logo" style={{ height: 40 }} onError={e => { e.target.style.display = 'none'; }} />
        <Title level={4} style={{ margin: 0, color: 'var(--primary-blue)' }}>SURYA'S MIB ENTERPRISES INTRANET</Title>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Badge count={5}>
          <BellOutlined style={{ fontSize: 20, color: 'var(--primary-blue)' }} />
        </Badge>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size={40} icon={<UserOutlined />} style={{ background: 'var(--gray-400)' }} />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 