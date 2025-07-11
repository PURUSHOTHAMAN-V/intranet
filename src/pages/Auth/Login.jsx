import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, Typography, Card, message, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const roles = [
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },
  { value: 'NewUser', label: 'New User' },
];

const roleRedirects = {
  Admin: '/',
  User: '/',
  NewUser: '/internships',
};

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = ({ email, password, role, remember }) => {
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password, role, remember);
      setLoading(false);
      if (result.success) {
        message.success('Login successful!');
        navigate(roleRedirects[role] || '/');
      } else {
        message.error('Invalid credentials or role. Please check your email, password, and role selection.');
      }
    }, 600);
  };

  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh', background: 'var(--gray-100)' }}>
      <Col xs={22} sm={16} md={10} lg={8} xl={6}>
        <Card style={{ padding: 32, boxShadow: '0 4px 24px rgba(30,58,138,0.08)', borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src={logo} alt="Company Logo" style={{ height: 48, marginBottom: 8 }} onError={e => { e.target.style.display = 'none'; }} />
            <Title level={4} style={{ color: 'var(--primary-blue)', marginBottom: 0 }}>SURYA'S MIB ENTERPRISES INTRANET</Title>
          </div>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Email or Username" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email or username is required' }}
                render={({ field }) => <Input {...field} placeholder="Enter your email or username" size="large" />}
              />
            </Form.Item>
            <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password is required' }}
                render={({ field }) => <Input.Password {...field} placeholder="Enter your password" size="large" />}
              />
            </Form.Item>
            <Form.Item label="Role" validateStatus={errors.role ? 'error' : ''} help={errors.role?.message}>
              <Controller
                name="role"
                control={control}
                defaultValue={roles[0].value}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <Select {...field} size="large">
                    {roles.map((role) => (
                      <Option key={role.value} value={role.value}>{role.label}</Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
            <Form.Item>
              <Controller
                name="remember"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    Remember Me
                  </Checkbox>
                )}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                Login
              </Button>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login; 