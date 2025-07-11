import React from 'react';
import { Row, Col, Card, Statistic, Button, List, Tag, Space, Progress, Calendar } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, CalendarOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const stats = [
  { title: 'My Tasks', value: 8, icon: <CheckCircleOutlined />, color: 'var(--primary-blue)' },
  { title: 'Pending Reports', value: 3, icon: <FileTextOutlined />, color: 'var(--warning)' },
  { title: 'Workshops Attended', value: 5, icon: <BookOutlined />, color: 'var(--info)' },
  { title: 'Leave Balance', value: '12 days', icon: <CalendarOutlined />, color: 'var(--success)' },
];

const taskProgress = [
  { name: 'Completed', value: 6 },
  { name: 'Pending', value: 2 },
];

const weeklyActivity = [
  { day: 'Mon', activity: 2 },
  { day: 'Tue', activity: 3 },
  { day: 'Wed', activity: 1 },
  { day: 'Thu', activity: 4 },
  { day: 'Fri', activity: 2 },
  { day: 'Sat', activity: 1 },
  { day: 'Sun', activity: 0 },
];

const skills = [
  { skill: 'Communication', value: 80 },
  { skill: 'Teamwork', value: 90 },
  { skill: 'Technical', value: 70 },
  { skill: 'Leadership', value: 60 },
  { skill: 'Creativity', value: 75 },
];

const activities = [
  { type: 'Task Completed', desc: 'Completed task: Prepare Report', time: 'Today' },
  { type: 'Report Submitted', desc: 'Submitted monthly report', time: 'Yesterday' },
  { type: 'Leave Requested', desc: 'Requested leave for 2 days', time: '2 days ago' },
  { type: 'Workshop Registered', desc: 'Registered for React Workshop', time: '3 days ago' },
];

const quickActions = [
  { label: 'Submit Report', icon: <FileTextOutlined /> },
  { label: 'Request Leave', icon: <CalendarOutlined /> },
  { label: 'Book Resource', icon: <CheckCircleOutlined /> },
  { label: 'View My Profile', icon: <UserOutlined /> },
  { label: 'Join Workshop', icon: <BookOutlined /> },
];

const UserDashboard = () => (
  <div style={{ padding: 24 }}>
    <Row gutter={[24, 24]}>
      {stats.map((stat) => (
        <Col xs={24} sm={12} md={6} key={stat.title}>
          <Card>
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
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col xs={24} md={8}>
        <Card title="My Task Progress">
          <Progress type="circle" percent={75} format={percent => `${percent}%`} strokeColor="#1e3a8a" />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card title="Weekly Activity">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="activity" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card title="Skills Development">
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Skill" dataKey="value" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.4} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col xs={24} md={12}>
        <Card title="My Recent Activities">
          <List
            itemLayout="horizontal"
            dataSource={activities}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<span>{item.type}</span>}
                  description={<span>{item.desc} &middot; <Tag color="blue">{item.time}</Tag></span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Quick Actions">
          <Space wrap>
            {quickActions.map(action => (
              <Button key={action.label} icon={action.icon} type="primary" ghost>{action.label}</Button>
            ))}
          </Space>
        </Card>
        <Card title="My Calendar" style={{ marginTop: 24 }}>
          <Calendar fullscreen={false} style={{ background: 'var(--gray-50)', borderRadius: 8 }} />
        </Card>
      </Col>
    </Row>
  </div>
);

export default UserDashboard; 