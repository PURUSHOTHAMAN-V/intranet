import React from 'react';
import { Card, Table, Typography, Tag, Button, Space, message } from 'antd';
import { useSubmissions } from '../../contexts/SubmissionContext';

const { Title } = Typography;

const statusColors = {
  Approved: 'green',
  Pending: 'orange',
  Rejected: 'red',
};

export default function AdminLeave() {
  const { leaveRequests, setLeaveRequests } = useSubmissions();

  const handleAction = (id, status) => {
    setLeaveRequests(prev => prev.map(lr =>
      lr.id === id ? { ...lr, status } : lr
    ));
    message.success(`Leave request ${status.toLowerCase()}!`);
  };

  const columns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Dates', dataIndex: 'dates', key: 'dates', render: dates => Array.isArray(dates) ? `${dates[0]} to ${dates[1]}` : dates },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: status => <Tag color={statusColors[status] || 'default'}>{status}</Tag>
    },
    { title: 'Submitted At', dataIndex: 'submittedAt', key: 'submittedAt' },
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
      <Card style={{ maxWidth: 800, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ marginBottom: 24 }}>All Leave Requests</Title>
        <Table
          columns={columns}
          dataSource={leaveRequests}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </Card>
    </div>
  );
} 