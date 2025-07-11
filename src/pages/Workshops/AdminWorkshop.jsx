import React, { useState } from 'react';
import { Card, Button, Typography, List, Modal, Input, DatePicker, InputNumber, Upload, message, Tag, Avatar, Space } from 'antd';
import { PlusOutlined, UserOutlined, UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useWorkshops } from '../../contexts/WorkshopContext';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const statusColors = {
  Approved: 'green',
  Pending: 'orange',
  Rejected: 'red',
};

export default function AdminWorkshop() {
  const { workshops, addWorkshop, setWorkshops } = useWorkshops();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    poster: '',
    speaker: '',
    topic: '',
    description: '',
    date: null,
    duration: 1,
  });
  const [uploading, setUploading] = useState(false);
  const [viewApplicants, setViewApplicants] = useState(null);

  const handleInput = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handlePoster = info => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'removed') {
      const reader = new FileReader();
      reader.onload = e => {
        setForm(f => ({ ...f, poster: e.target.result }));
        setUploading(false);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleAdd = () => {
    if (!form.topic || !form.speaker || !form.description || !form.date || !form.duration) {
      message.error('Please fill all fields');
      return;
    }
    addWorkshop({
      ...form,
      date: form.date.format('YYYY-MM-DD'),
    });
    setForm({ poster: '', speaker: '', topic: '', description: '', date: null, duration: 1 });
    setModalOpen(false);
    message.success('Workshop added!');
  };

  const handleApplicantAction = (workshopId, email, status) => {
    setWorkshops(prev => prev.map(w =>
      w.id === workshopId
        ? { ...w, applicants: w.applicants.map(app => app.email === email ? { ...app, status } : app) }
        : w
    ));
    message.success(`Applicant ${status.toLowerCase()}!`);
  };

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 900, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={2} style={{ margin: 0 }}>Workshops</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            Add Workshop
          </Button>
        </div>
        <List
          dataSource={workshops}
          locale={{ emptyText: 'No workshops yet.' }}
          renderItem={item => (
            <List.Item
              key={item.id}
              style={{ alignItems: 'flex-start' }}
              actions={[
                <Button key="view" onClick={() => setViewApplicants(item)} icon={<UserOutlined />}>Applicants ({item.applicants.length})</Button>
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
          )}
        />
        <Modal
          open={modalOpen}
          title="Add Workshop"
          onCancel={() => setModalOpen(false)}
          onOk={handleAdd}
          okText="Add"
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handlePoster}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {form.poster ? 'Change Poster' : 'Upload Poster'}
              </Button>
            </Upload>
            {form.poster && <img src={form.poster} alt="Poster" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
            <Input placeholder="Workshop Topic" value={form.topic} onChange={e => handleInput('topic', e.target.value)} maxLength={64} />
            <Input placeholder="Speaker" value={form.speaker} onChange={e => handleInput('speaker', e.target.value)} maxLength={48} />
            <DatePicker style={{ width: '100%' }} value={form.date} onChange={date => handleInput('date', date)} />
            <InputNumber min={1} max={30} value={form.duration} onChange={val => handleInput('duration', val)} style={{ width: '100%' }} placeholder="Duration (days)" />
            <Input.TextArea placeholder="Description" value={form.description} onChange={e => handleInput('description', e.target.value)} rows={3} maxLength={256} />
          </Space>
        </Modal>
        <Modal
          open={!!viewApplicants}
          title={viewApplicants ? `Applicants for: ${viewApplicants.topic}` : ''}
          onCancel={() => setViewApplicants(null)}
          footer={null}
        >
          {viewApplicants && (
            <List
              dataSource={viewApplicants.applicants}
              locale={{ emptyText: 'No applicants yet.' }}
              renderItem={app => (
                <List.Item
                  actions={[
                    <Tag color={statusColors[app.status] || 'default'} key="status">{app.status}</Tag>,
                    <Button
                      type="primary"
                      size="small"
                      icon={<CheckCircleOutlined />}
                      disabled={app.status !== 'Pending'}
                      onClick={() => handleApplicantAction(viewApplicants.id, app.email, 'Approved')}
                      key="accept"
                    >
                      Accept
                    </Button>,
                    <Button
                      danger
                      size="small"
                      icon={<CloseCircleOutlined />}
                      disabled={app.status !== 'Pending'}
                      onClick={() => handleApplicantAction(viewApplicants.id, app.email, 'Rejected')}
                      key="reject"
                    >
                      Reject
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={app.name || app.email}
                    description={app.email}
                  />
                </List.Item>
              )}
            />
          )}
        </Modal>
      </Card>
    </div>
  );
} 