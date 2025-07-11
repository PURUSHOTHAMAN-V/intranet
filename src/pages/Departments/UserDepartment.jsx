import React from 'react';
import { Card, Row, Col, Avatar, List, Tag, Typography, Statistic, Divider } from 'antd';
import { UserOutlined, TeamOutlined, ProjectOutlined, DollarOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

const mockDepartment = {
  name: 'R&D',
  description: 'Research and Development department focused on innovation and new technologies.',
  head: { name: 'Dr. Smith', email: 'smith@mib.com', avatar: '', role: 'Department Head' },
  team: [
    { name: 'R&D User', role: 'User', avatar: '', email: 'rnd@mib.com' },
    { name: 'Alice Brown', role: 'User', avatar: '', email: 'alice.brown@mib.com' },
    { name: 'Bob White', role: 'User', avatar: '', email: 'bob.white@mib.com' },
  ],
  projects: [
    { name: 'AI Platform', status: 'Ongoing' },
    { name: 'IoT Sensors', status: 'Completed' },
    { name: 'Cloud Migration', status: 'Ongoing' },
  ],
  stats: {
    employees: 12,
    projects: 3,
    budget: 1200000,
  },
  budgetInfo: {
    total: 1200000,
    used: 800000,
    remaining: 400000,
  },
};

const UserDepartment = () => {
  const { user } = useAuth();
  // In a real app, filter department by user.department
  const department = mockDepartment;

  return (
    <div style={{ padding: 32, background: 'var(--gray-50)', minHeight: '100vh' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 12 }}>
            <Title level={4}>{department.name} Department</Title>
            <Text type="secondary">{department.description}</Text>
            <Divider />
            <div style={{ marginBottom: 16 }}>
              <Text strong>Department Head:</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <Avatar icon={<UserOutlined />} src={department.head.avatar} />
                <div>
                  <Text>{department.head.name}</Text><br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{department.head.email}</Text>
                </div>
                <Tag color="blue" style={{ marginLeft: 8 }}>{department.head.role}</Tag>
              </div>
            </div>
            <Divider />
            <Row gutter={16}>
              <Col span={12}><Statistic title="Employees" value={department.stats.employees} prefix={<TeamOutlined />} /></Col>
              <Col span={12}><Statistic title="Projects" value={department.stats.projects} prefix={<ProjectOutlined />} /></Col>
            </Row>
            <Divider />
            <Statistic title="Budget" value={department.stats.budget} prefix={<DollarOutlined />} valueStyle={{ color: 'var(--primary-blue)' }} precision={0} suffix="INR" />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: 12, marginBottom: 24 }} title="Team Members">
            <List
              itemLayout="horizontal"
              dataSource={department.team}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} src={item.avatar} />}
                    title={<span>{item.name}</span>}
                    description={<span>{item.role} &middot; {item.email}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card style={{ borderRadius: 12 }} title="Current Projects">
            <List
              itemLayout="horizontal"
              dataSource={department.projects}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.name}</span>}
                    description={<Tag color={item.status === 'Ongoing' ? 'blue' : 'green'}>{item.status}</Tag>}
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card style={{ borderRadius: 12, marginTop: 24 }} title="Budget Information">
            <Row gutter={16}>
              <Col span={8}><Statistic title="Total" value={department.budgetInfo.total} prefix={<DollarOutlined />} valueStyle={{ color: 'var(--primary-blue)' }} precision={0} suffix="INR" /></Col>
              <Col span={8}><Statistic title="Used" value={department.budgetInfo.used} prefix={<DollarOutlined />} valueStyle={{ color: 'var(--warning)' }} precision={0} suffix="INR" /></Col>
              <Col span={8}><Statistic title="Remaining" value={department.budgetInfo.remaining} prefix={<DollarOutlined />} valueStyle={{ color: 'var(--success)' }} precision={0} suffix="INR" /></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDepartment; 