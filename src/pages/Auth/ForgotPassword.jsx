import React from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import './ForgotPassword.module.css';

const { Title } = Typography;

const ForgotPassword = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Placeholder: handle forgot password logic
    message.success('Reset link sent to your email (mock)');
  };

  return (
    <div className="forgot-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)' }}>
      <Card style={{ width: 380, padding: 32, boxShadow: '0 4px 24px rgba(30,58,138,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4} style={{ color: 'var(--primary-blue)', marginBottom: 0 }}>Forgot Password</Title>
        </div>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' } }}
              render={({ field }) => <Input {...field} placeholder="Enter your email" size="large" />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Send Reset Link
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <a href="/">Back to Login</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword; 