import React from 'react';
import { Card, Table, Typography, Tag, Button, Space, message } from 'antd';
import { useSubmissions } from '../../contexts/SubmissionContext';

const { Title } = Typography;

const statusColors = {
  Approved: 'green',
  Pending: 'orange',
  Rejected: 'red',
};

export default function AdminInternship() {
  const { internshipApplications, setInternshipApplications } = useSubmissions();

  const handleAction = (id, status) => {
    setInternshipApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status } : app
    ));
    message.success(`Application ${status.toLowerCase()}!`);
  };

  const columns = [
    { title: 'Student', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Applied', dataIndex: 'applied', key: 'applied' },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: status => <Tag color={statusColors[status] || 'default'}>{status}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            disabled={record.status !== 'Pending'}
            onClick={() => handleAction(record.id, 'Approved')}
          >
            Accept
          </Button>
          <Button
            danger
            size="small"
            disabled={record.status !== 'Pending'}
            onClick={() => handleAction(record.id, 'Rejected')}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 900, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ marginBottom: 24 }}>Internship Applications</Title>
        <Table
          columns={columns}
          dataSource={internshipApplications}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </Card>
    </div>
  );
} 