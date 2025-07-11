import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuth();

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
      {role !== 'NewUser' && <Sidebar role={role} collapsed={collapsed} onCollapse={setCollapsed} />}
      <Layout>
        <Header />
        <Content style={{ margin: 'var(--space-8)', background: 'var(--white)', borderRadius: 8, boxShadow: '0 2px 8px rgba(30,58,138,0.04)', minHeight: '60vh' }}>
          <Outlet />
        </Content>
        <footer style={{ width: '100%', height: '25vh', background: '#111827', color: '#fff', textAlign: 'center', padding: 0, fontSize: 16, letterSpacing: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: 0 }}>
          <div>SURYA'S MIB ENTERPRISES &bull; Contact: <a href="mailto:info@suryasmib.com" style={{ color: '#fff', textDecoration: 'underline' }}>info@suryasmib.com</a> &bull; Phone: <a href="tel:+919876543210" style={{ color: '#fff', textDecoration: 'underline' }}>+91 98765 43210</a></div>
          <div style={{ marginTop: 6, fontSize: 14, color: '#d1d5db' }}>© {new Date().getFullYear()} SURYA'S MIB ENTERPRISES. All rights reserved.</div>
        </footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 