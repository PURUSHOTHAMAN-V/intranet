import React, { useState } from 'react';
import { Card, Button, Typography, DatePicker, Form, Input, message, List, Tag } from 'antd';
import dayjs from 'dayjs';
import { useAuth } from '../contexts/AuthContext';
import { useSubmissions } from '../contexts/SubmissionContext';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function Leave() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { leaveRequests, addLeaveRequest } = useSubmissions();

  const handleSubmit = values => {
    setSubmitting(true);
    setTimeout(() => {
      const request = {
        id: Date.now(),
        user: user?.name || user?.email || 'Unknown',
        email: user?.email,
        dates: values.dates.map(d => d.format('YYYY-MM-DD')),
        reason: values.reason,
        status: 'Pending',
        submittedAt: dayjs().format('YYYY-MM-DD HH:mm'),
      };
      addLeaveRequest(request);
      form.resetFields();
      setSubmitting(false);
      message.success('Leave request sent to admin! (mock)');
    }, 800);
  };

  // Show only current user's leave requests
  const myHistory = leaveRequests.filter(lr => lr.email === user?.email);

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 480, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Leave Application</Title>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Leave Dates" name="dates" rules={[{ required: true, message: 'Please select leave dates' }]}> 
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Reason for Leave" name="reason" rules={[{ required: true, message: 'Please enter a reason for leave' }]}> 
            <Input.TextArea rows={3} placeholder="Enter your reason for leave" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block>
              Submit Leave Request
            </Button>
          </Form.Item>
        </Form>
        <Title level={4} style={{ marginTop: 32, marginBottom: 12 }}>Leave History</Title>
        <List
          dataSource={myHistory}
          locale={{ emptyText: 'No leave requests submitted yet.' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<span>{item.dates[0]} to {item.dates[1]}</span>}
                description={<>
                  <span><b>Reason:</b> {item.reason}</span><br/>
                  <Tag color="orange">{item.status}</Tag>
                  <span style={{ color: '#888', marginLeft: 8 }}>Submitted: {item.submittedAt}</span>
                </>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
} 