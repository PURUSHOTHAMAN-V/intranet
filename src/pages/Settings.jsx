import React, { useState, useEffect } from 'react';
import { Card, Typography, Tabs, Form, Input, Button, Switch, Divider, message, Space, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, BulbOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export default function Settings() {
  const [form] = Form.useForm();
  const [notif, setNotif] = useState({ email: true, sms: false, push: true });
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  // Apply theme to body and persist
  useEffect(() => {
    const saved = localStorage.getItem('mib_theme');
    if (saved) {
      setTheme(saved);
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${saved}`);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('mib_theme', theme);
  }, [theme]);

  const handleProfileSave = values => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Profile updated! (demo)');
    }, 800);
  };

  const handlePasswordChange = values => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Password changed! (demo)');
    }, 800);
  };

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: 'var(--f8fafc, #f8fafc)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 600, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ marginBottom: 24 }}>Settings</Title>
        <Tabs defaultActiveKey="profile">
          <TabPane tab={<span><UserOutlined /> Profile</span>} key="profile">
            <Form layout="vertical" form={form} onFinish={handleProfileSave} initialValues={{ name: '', email: '' }}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}> <Input prefix={<UserOutlined />} placeholder="Your Name" /></Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}> <Input prefix={<MailOutlined />} placeholder="Your Email" /></Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>Save Profile</Button>
              </Form.Item>
            </Form>
            <Divider />
            <Form layout="vertical" onFinish={handlePasswordChange}>
              <Form.Item label="Current Password" name="current" rules={[{ required: true, message: 'Enter current password' }]}> <Input.Password prefix={<LockOutlined />} /></Form.Item>
              <Form.Item label="New Password" name="new" rules={[{ required: true, message: 'Enter new password' }]}> <Input.Password prefix={<LockOutlined />} /></Form.Item>
              <Form.Item label="Confirm New Password" name="confirm" dependencies={["new"]} rules={[{ required: true, message: 'Confirm new password' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('new') === value) { return Promise.resolve(); } return Promise.reject(new Error('Passwords do not match!')); } })]}> <Input.Password prefix={<LockOutlined />} /></Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>Change Password</Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<span><MailOutlined /> Notifications</span>} key="notifications">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Email Notifications</span>
                <Switch checked={notif.email} onChange={v => setNotif(n => ({ ...n, email: v }))} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>SMS Notifications</span>
                <Switch checked={notif.sms} onChange={v => setNotif(n => ({ ...n, sms: v }))} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Push Notifications</span>
                <Switch checked={notif.push} onChange={v => setNotif(n => ({ ...n, push: v }))} />
              </div>
            </Space>
          </TabPane>
          <TabPane tab={<span><BulbOutlined /> Theme</span>} key="theme">
            <Form layout="vertical">
              <Form.Item label="Theme">
                <Select value={theme} onChange={setTheme} style={{ width: 200 }}>
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
} 