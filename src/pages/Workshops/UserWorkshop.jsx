import React from 'react';
import { Card, Button, Typography, List, Tag, Avatar, message, Space } from 'antd';
import { UserOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useWorkshops } from '../../contexts/WorkshopContext';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Paragraph } = Typography;

export default function UserWorkshop() {
  const { workshops, applyToWorkshop } = useWorkshops();
  const { user } = useAuth();

  const handleApply = (workshopId) => {
    if (!user) {
      message.error('You must be logged in to apply.');
      return;
    }
    applyToWorkshop(workshopId, { name: user.name, email: user.email });
    message.success('Applied to workshop!');
  };

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 900, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ marginBottom: 24 }}>Available Workshops</Title>
        <List
          dataSource={workshops}
          locale={{ emptyText: 'No workshops available.' }}
          renderItem={item => {
            const alreadyApplied = item.applicants.some(app => app.email === user?.email);
            return (
              <List.Item
                key={item.id}
                style={{ alignItems: 'flex-start' }}
                actions={[
                  alreadyApplied ? (
                    <Tag icon={<CheckCircleOutlined />} color="success" key="applied">Applied</Tag>
                  ) : (
                    <Button key="apply" type="primary" onClick={() => handleApply(item.id)} disabled={alreadyApplied}>Apply</Button>
                  )
                ]}
              >
                <List.Item.Meta
                  avatar={item.poster ? <Avatar shape="square" size={64} src={item.poster} /> : <Avatar shape="square" size={64} icon={<UploadOutlined />} />}
                  title={<span style={{ fontWeight: 600 }}>{item.topic}</span>}
                  description={
                    <div>
                      <Paragraph style={{ margin: 0 }}><b>Speaker:</b> {item.speaker}</Paragraph>
                      <Paragraph style={{ margin: 0 }}><b>Date:</b> {item.date} <b>Duration:</b> {item.duration} day(s)</Paragraph>
                      <Paragraph style={{ margin: 0 }}><b>Description:</b> {item.description}</Paragraph>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
} 