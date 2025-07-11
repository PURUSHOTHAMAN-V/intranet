import React, { useState } from 'react';
import { Card, Button, Typography, InputNumber, Upload, Progress, message, Row, Col, Form, Image, Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useReports } from '../contexts/ReportsContext';

const { Title } = Typography;

const mockProjects = [
  { id: 1, name: 'AI Platform' },
  { id: 2, name: 'Cloud Migration' },
  { id: 3, name: 'Mobile App Redesign' },
];

export default function Reports() {
  const { user, role } = useAuth();
  const { reports, addReport } = useReports();
  const [progressData, setProgressData] = useState(
    mockProjects.map(p => ({ ...p, progress: 0, image: null, submitted: false }))
  );

  const handleProgressChange = (id, value) => {
    setProgressData(data => data.map(p => p.id === id ? { ...p, progress: value } : p));
  };

  const handleImageChange = (id, info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = e => {
        setProgressData(data => data.map(p => p.id === id ? { ...p, image: e.target.result } : p));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleSubmit = id => {
    const project = progressData.find(p => p.id === id);
    if (!project) return;
    addReport({
      userName: user?.name || user?.email || 'Unknown',
      userEmail: user?.email,
      projectName: project.name,
      progress: project.progress,
      image: project.image,
    });
    setProgressData(data => data.map(p => p.id === id ? { ...p, submitted: true } : p));
    message.success('Progress submitted and sent to admin!');
  };

  // Admin view: show all reports
  if (role === 'Admin') {
    const columns = [
      { title: 'User', dataIndex: 'userName', key: 'userName' },
      { title: 'Email', dataIndex: 'userEmail', key: 'userEmail' },
      { title: 'Project', dataIndex: 'projectName', key: 'projectName' },
      { title: 'Progress (%)', dataIndex: 'progress', key: 'progress', render: v => <Tag color="blue">{v}%</Tag> },
      { title: 'Image', dataIndex: 'image', key: 'image', render: img => img ? <Image src={img} width={80} /> : '-' },
      { title: 'Submitted At', dataIndex: 'submittedAt', key: 'submittedAt', render: t => t ? new Date(t).toLocaleString() : '-' },
    ];
    return (
      <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc' }}>
        <Title level={2} style={{ marginBottom: 32 }}>All User Reports</Title>
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </div>
    );
  }

  // User view: submit and see own reports
  const myReports = reports.filter(r => r.userEmail === user?.email);

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc' }}>
      <Title level={2} style={{ marginBottom: 32 }}>My Reports</Title>
      <Row gutter={[24, 24]}>
        {progressData.map(project => (
          <Col xs={24} md={12} lg={8} key={project.id}>
            <Card title={project.name} bordered style={{ borderRadius: 12 }}>
              <Form layout="vertical">
                <Form.Item label="Progress (%)">
                  <InputNumber
                    min={0}
                    max={100}
                    value={project.progress}
                    onChange={value => handleProgressChange(project.id, value)}
                    style={{ width: '100%' }}
                    disabled={project.submitted}
                  />
                  <Progress percent={project.progress} style={{ marginTop: 8 }} />
                </Form.Item>
                <Form.Item label="Upload Progress Image">
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={info => handleImageChange(project.id, info)}
                    disabled={project.submitted}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                  {project.image && (
                    <Image src={project.image} alt="Progress" style={{ marginTop: 12, borderRadius: 8 }} width={120} />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => handleSubmit(project.id)}
                    disabled={project.submitted || project.progress === 0 || !project.image}
                    block
                  >
                    {project.submitted ? 'Submitted' : 'Submit Progress'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        ))}
      </Row>
      <Title level={4} style={{ marginTop: 32 }}>My Submitted Reports</Title>
      <Table
        columns={[
          { title: 'Project', dataIndex: 'projectName', key: 'projectName' },
          { title: 'Progress (%)', dataIndex: 'progress', key: 'progress', render: v => <Tag color="blue">{v}%</Tag> },
          { title: 'Image', dataIndex: 'image', key: 'image', render: img => img ? <Image src={img} width={80} /> : '-' },
          { title: 'Submitted At', dataIndex: 'submittedAt', key: 'submittedAt', render: t => t ? new Date(t).toLocaleString() : '-' },
        ]}
        dataSource={myReports}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
} 