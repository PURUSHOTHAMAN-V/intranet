import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Progress, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import './ResetPassword.module.css';

const { Title } = Typography;

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

const ResetPassword = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const password = watch('password', '');
  const strength = getPasswordStrength(password);

  const onSubmit = (data) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      message.success('Password reset successful (mock)');
    }, 1000);
  };

  return (
    <div className="reset-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)' }}>
      <Card style={{ width: 380, padding: 32, boxShadow: '0 4px 24px rgba(30,58,138,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4} style={{ color: 'var(--primary-blue)', marginBottom: 0 }}>Reset Password</Title>
        </div>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="New Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } }}
              render={({ field }) => <Input.Password {...field} placeholder="Enter new password" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Confirm Password" validateStatus={errors.confirm ? 'error' : ''} help={errors.confirm?.message}>
            <Controller
              name="confirm"
              control={control}
              defaultValue=""
              rules={{
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              }}
              render={({ field }) => <Input.Password {...field} placeholder="Confirm new password" size="large" />}
            />
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            <Progress percent={strength * 25} showInfo={false} status={strength < 3 ? 'exception' : 'success'} />
            <div style={{ fontSize: 12, color: strength < 3 ? 'var(--error)' : 'var(--success)' }}>
              {strength === 0 && 'Enter a password'}
              {strength === 1 && 'Weak'}
              {strength === 2 && 'Fair'}
              {strength === 3 && 'Good'}
              {strength === 4 && 'Strong'}
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={submitting}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword; 