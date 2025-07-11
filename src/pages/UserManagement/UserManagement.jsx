import React, { useState } from 'react';
import { Card, Table, Button, Input, Select, Tag, Avatar, Switch, Space, Modal, Form, Upload, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const mockUsers = [
  {
    key: 1,
    photo: '',
    name: 'John Doe',
    email: 'john.doe@mib.com',
    role: 'User',
    department: 'IT',
    status: true,
  },
  {
    key: 2,
    photo: '',
    name: 'Jane Smith',
    email: 'jane.smith@mib.com',
    role: 'Admin',
    department: 'HR',
    status: true,
  },
  {
    key: 3,
    photo: '',
    name: 'Alice Brown',
    email: 'alice.brown@mib.com',
    role: 'Intern',
    department: 'Finance',
    status: false,
  },
];

const roles = ['Admin', 'User', 'Intern', 'Department Head', 'HR Manager'];
const departments = ['IT', 'HR', 'Finance', 'Marketing', 'R&D'];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (key) => {
    setUsers(users.filter(u => u.key !== key));
    message.success('User deleted');
  };

  const handleStatusChange = (checked, record) => {
    setUsers(users.map(u => u.key === record.key ? { ...u, status: checked } : u));
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        setUsers(users.map(u => u.key === editingUser.key ? { ...editingUser, ...values } : u));
        message.success('User updated');
      } else {
        setUsers([...users, { ...values, key: Date.now(), status: true }]);
        message.success('User added');
      }
      setIsModalOpen(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleBulkDelete = () => {
    setUsers(users.filter(u => !selectedRowKeys.includes(u.key)));
    setSelectedRowKeys([]);
    message.success('Selected users deleted');
  };

  const handleExportCSV = () => {
    message.info('Export to CSV (mock)');
  };

  const handleImportCSV = () => {
    message.info('Import from CSV (mock)');
  };

  const filteredUsers = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!filterRole || u.role === filterRole) &&
    (!filterStatus || (filterStatus === 'Active' ? u.status : !u.status))
  );

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <Avatar icon={<UserOutlined />} src={photo} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={role === 'Admin' ? 'blue' : role === 'User' ? 'green' : 'orange'}>{role}</Tag>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => <Switch checked={status} onChange={checked => handleStatusChange(checked, record)} checkedChildren="Active" unCheckedChildren="Inactive" />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleEditUser(record)} />
          <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteUser(record.key)} />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<DownloadOutlined />} onClick={handleExportCSV}>Export to CSV</Menu.Item>
      <Menu.Item icon={<UploadOutlined />} onClick={handleImportCSV}>Import from CSV</Menu.Item>
      <Menu.Item danger onClick={handleBulkDelete} disabled={!selectedRowKeys.length}>Delete Selected</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: 32, background: 'var(--gray-50)', minHeight: '100vh' }}>
      <Card style={{ borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser} style={{ marginRight: 16 }}>Add New User</Button>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>Bulk Actions</Button>
            </Dropdown>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Input.Search
              placeholder="Search users"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              placeholder="Filter by Role"
              allowClear
              style={{ width: 150 }}
              value={filterRole || undefined}
              onChange={setFilterRole}
            >
              {roles.map(role => <Option key={role} value={role}>{role}</Option>)}
            </Select>
            <Select
              placeholder="Status"
              allowClear
              style={{ width: 120 }}
              value={filterStatus || undefined}
              onChange={setFilterStatus}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredUsers}
          pagination={{ pageSize: 6 }}
          bordered
        />
      </Card>
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingUser ? 'Update' : 'Add'}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}> <Input /> </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}> <Input /> </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select role' }]}> <Select>{roles.map(role => <Option key={role} value={role}>{role}</Option>)}</Select> </Form.Item>
          <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please select department' }]}> <Select>{departments.map(dep => <Option key={dep} value={dep}>{dep}</Option>)}</Select> </Form.Item>
          <Form.Item label="Profile Photo" name="photo"> <Upload showUploadList={false} beforeUpload={() => false}><Button icon={<UploadOutlined />}>Upload</Button></Upload> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 