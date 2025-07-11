import React, { useState } from 'react';
import { Card, Button, Typography, List, Modal, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const initialDepartments = [
  { id: 1, name: 'R&D' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Technical' },
  { id: 4, name: 'MIC' },
];

export default function AdminDepartment() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDept, setNewDept] = useState('');

  const handleAdd = () => {
    if (!newDept.trim()) {
      message.error('Department name cannot be empty');
      return;
    }
    if (departments.some(d => d.name.toLowerCase() === newDept.trim().toLowerCase())) {
      message.error('Department already exists');
      return;
    }
    setDepartments(depts => [
      ...depts,
      { id: Date.now(), name: newDept.trim() },
    ]);
    setNewDept('');
    setModalOpen(false);
    message.success('Department added!');
  };

  const handleRemove = id => {
    setDepartments(depts => depts.filter(d => d.id !== id));
    message.success('Department removed!');
  };

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Card style={{ maxWidth: 480, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={2} style={{ margin: 0 }}>Departments</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            Add
          </Button>
        </div>
        <List
          dataSource={departments}
          locale={{ emptyText: 'No departments.' }}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure to remove this department?"
                  onConfirm={() => handleRemove(item.id)}
                  okText="Yes"
                  cancelText="No"
                  key="remove"
                >
                  <Button icon={<DeleteOutlined />} danger size="small" />
                </Popconfirm>
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
        <Modal
          open={modalOpen}
          title="Add Department"
          onCancel={() => setModalOpen(false)}
          onOk={handleAdd}
          okText="Add"
        >
          <Input
            placeholder="Department name"
            value={newDept}
            onChange={e => setNewDept(e.target.value)}
            onPressEnter={handleAdd}
            maxLength={32}
          />
        </Modal>
      </Card>
    </div>
  );
} 