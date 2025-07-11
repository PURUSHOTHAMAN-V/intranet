import React, { useRef, useState } from 'react';
import { Card, Row, Col, Avatar, Button, Form, Input, Upload, Tabs, List, Tag, Typography, message } from 'antd';
import { UserOutlined, UploadOutlined, MailOutlined, PhoneOutlined, LockOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const mockProfile = {
  name: 'Admin User',
  email: 'admin@mib.com',
  department: 'IT',
  role: 'Admin',
  phone: '+91 9876543210',
  emergency: '+91 9123456789',
  org: 'MIB Enterprises',
  clg: 'ABC College',
  clgId: 'CLG12345',
};

const activities = [
  { type: 'Task Completed', desc: 'Completed system audit', time: 'Today' },
  { type: 'Report Submitted', desc: 'Submitted monthly report', time: 'Yesterday' },
  { type: 'Leave Approved', desc: 'Approved leave for John', time: '2 days ago' },
  { type: 'Workshop Hosted', desc: 'Hosted React Workshop', time: '3 days ago' },
];

const Profile = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInput = useRef();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => setAvatarUrl(e.target.result);
      reader.readAsDataURL(file);
      message.success('Profile photo updated!');
    }
  };

  const isNewUser = user?.role === 'NewUser';

  return (
    <div style={{ padding: 32, background: 'var(--gray-50)', minHeight: '100vh' }}>
      {isNewUser && (
        <Button
          onClick={() => navigate('/internships')}
          style={{
            marginBottom: 16,
            fontSize: 16,
            padding: '6px 20px',
            background: '#1e293b',
            color: '#fff',
            borderRadius: 8,
            border: 'none',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(30,41,59,0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#0f172a')}
          onMouseOut={e => (e.currentTarget.style.background = '#1e293b')}
        >
          ← Back to Home
        </Button>
      )}
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 12, textAlign: 'center' }}>
            <div
              style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar
                size={96}
                src={avatarUrl}
                icon={<UserOutlined />}
                style={{ cursor: 'pointer', border: '2px solid #1e3a8a' }}
                onClick={() => fileInput.current && fileInput.current.click()}
              />
              {hovered && (
                <EditOutlined
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 8,
                    fontSize: 24,
                    color: '#fff',
                    background: '#1e3a8a',
                    borderRadius: '50%',
                    padding: 4,
                    boxShadow: '0 2px 8px rgba(30,58,138,0.15)',
                    cursor: 'pointer',
                  }}
                  onClick={() => fileInput.current && fileInput.current.click()}
                />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </div>
            {/* Remove Upload button for non-NewUser, pen icon is now universal */}
            <Title level={4} style={{ marginTop: 16 }}>{user?.name || mockProfile.name}</Title>
            <Text type="secondary">{user?.role || mockProfile.role}</Text>
            <div style={{ marginTop: 16 }}>
              <Tag color="blue">{user?.department || mockProfile.department}</Tag>
              <Tag color="geekblue">{user?.org || mockProfile.org}</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: 12 }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Personal Info" key="1">
                <Form layout="vertical" initialValues={{
                  name: user?.name || mockProfile.name,
                  email: user?.email || mockProfile.email,
                  department: user?.department || mockProfile.department,
                  org: user?.org || mockProfile.org,
                  clg: user?.clg || mockProfile.clg,
                  clgId: user?.clgId || mockProfile.clgId,
                  phone: user?.phone || mockProfile.phone,
                  emergency: user?.emergency || mockProfile.emergency,
                }}>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Name" name="name">
                        <Input prefix={<UserOutlined />} disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Email" name="email">
                        <Input prefix={<MailOutlined />} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Department" name="department">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Organization" name="org">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item label="College Name" name="clg">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="College ID" name="clgId">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Phone" name="phone">
                        <Input prefix={<PhoneOutlined />} disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Emergency Contact" name="emergency">
                        <Input prefix={<PhoneOutlined />} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>
              <TabPane tab="Account Settings" key="2">
                <Form layout="vertical">
                  <Form.Item label="Change Password">
                    <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
                  </Form.Item>
                  <Form.Item label="Email Preferences">
                    <Input prefix={<MailOutlined />} placeholder="Email Preferences" disabled />
                  </Form.Item>
                  <Form.Item label="Notification Settings">
                    <Input placeholder="Notification Settings" disabled />
                  </Form.Item>
                </Form>
              </TabPane>
              {!isNewUser && (
                <TabPane tab="Activity Summary" key="3">
                  <List
                    itemLayout="horizontal"
                    dataSource={activities}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<FileTextOutlined style={{ fontSize: 20, color: 'var(--primary-blue)' }} />}
                          title={<span>{item.type}</span>}
                          description={<span>{item.desc} &middot; <Tag color="blue">{item.time}</Tag></span>}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
              )}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile; 