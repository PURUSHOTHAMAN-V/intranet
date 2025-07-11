import React from 'react';
import { Row, Col, Card, Statistic, Button, List, Tag, Space } from 'antd';
import { UserOutlined, TeamOutlined, FileTextOutlined, CheckCircleOutlined, PlusOutlined, CalendarOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const stats = [
  { title: 'Total Employees', value: 245, icon: <TeamOutlined />, color: 'var(--primary-blue)' },
  { title: 'Active Interns', value: 58, icon: <UserOutlined />, color: 'var(--success)' },
  { title: 'Ongoing Workshops', value: 12, icon: <FileTextOutlined />, color: 'var(--info)' },
  { title: 'Projects Completed', value: 89, icon: <CheckCircleOutlined />, color: 'var(--success)' },
];

const barData = [
  { department: 'HR', performance: 80 },
  { department: 'IT', performance: 95 },
  { department: 'Finance', performance: 70 },
  { department: 'Marketing', performance: 60 },
  { department: 'R&D', performance: 90 },
];

const lineData = [
  { month: 'Jan', progress: 60 },
  { month: 'Feb', progress: 70 },
  { month: 'Mar', progress: 80 },
  { month: 'Apr', progress: 90 },
  { month: 'May', progress: 100 },
  { month: 'Jun', progress: 95 },
];

const activities = [
  { type: 'User Registration', user: 'John Doe', time: '2 min ago' },
  { type: 'Project Assigned', user: 'Jane Smith', time: '10 min ago' },
  { type: 'Workshop Completed', user: 'Alice Brown', time: '30 min ago' },
  { type: 'System Alert', user: 'System', time: '1 hr ago' },
];

const quickActions = [
  { label: 'Create New User', icon: <PlusOutlined /> },
  { label: 'Create New Internship', icon: <PlusOutlined /> },
  { label: 'Schedule Workshop', icon: <CalendarOutlined /> },
  { label: 'Generate System Report', icon: <FileTextOutlined /> },
  { label: 'Send Announcement', icon: <BellOutlined /> },
  { label: 'Manage Permissions', icon: <SettingOutlined /> },
];

const systemOverview = [
  { label: 'Server Status', value: 'Online', color: 'green' },
  { label: 'Database Health', value: 'Healthy', color: 'green' },
  { label: 'Active Sessions', value: 34, color: 'blue' },
  { label: 'System Alerts', value: 2, color: 'red' },
];

const cardStyle = {
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
  background: 'var(--white)',
  marginBottom: 24,
};

const AdminDashboard = () => (
  <div style={{ padding: 32, background: 'var(--gray-50)', minHeight: '100vh' }}>
    <Row gutter={[24, 24]}>
      {stats.map((stat) => (
        <Col xs={24} sm={12} md={6} key={stat.title}>
          <Card style={cardStyle}>
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.icon}
              valueStyle={{ color: stat.color, fontWeight: 600 }}
            />
          </Card>
        </Col>
      ))}
    </Row>
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12}>
        <Card style={cardStyle} title="Department Performance">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card style={cardStyle} title="Monthly Progress">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="progress" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12}>
        <Card style={cardStyle} title="Recent Activities">
          <List
            itemLayout="horizontal"
            dataSource={activities}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<span>{item.type}</span>}
                  description={<span>{item.user} &middot; <Tag color="blue">{item.time}</Tag></span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card style={cardStyle} title="Quick Actions">
          <Space wrap>
            {quickActions.map(action => (
              <Button key={action.label} icon={action.icon} type="primary" ghost>{action.label}</Button>
            ))}
          </Space>
        </Card>
        <Card style={{ ...cardStyle, marginTop: 24 }} title="System Overview">
          <List
            dataSource={systemOverview}
            renderItem={item => (
              <List.Item>
                <Tag color={item.color}>{item.label}: {item.value}</Tag>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default AdminDashboard; 