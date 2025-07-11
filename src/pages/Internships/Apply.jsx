import React, { useState } from 'react';
import { Form, Input, Button, Typography, Select, message, Space } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import styles from './Internships.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useSubmissions } from '../../contexts/SubmissionContext';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const companyRoles = [
  { value: 'Marketing', label: 'Marketing' },
  { value: 'R&D', label: 'R&D' },
  { value: 'Technical', label: 'Technical' },
  { value: 'MIC', label: 'MIC' },
];

export default function ApplyInternship() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { addInternshipApplication } = useSubmissions();
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }, maxFiles: 1 });
  const onSubmit = (data) => {
    if (!file) {
      message.error('Please upload your resume.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addInternshipApplication({
        id: Date.now(),
        name: user?.name || data.name,
        email: user?.email || data.email,
        department: data.roleInCompany,
        status: 'Pending',
        applied: new Date().toISOString().slice(0, 10),
      });
      message.success('Application submitted successfully!');
      reset();
      setFile(null);
      setSubmitting(false);
    }, 1200);
  };
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', background: '#fff', boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: '18px 0 18px 0', position: 'fixed', top: 0, left: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="4"/>
            <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">MIB</text>
            <text x="50%" y="70%" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="Arial, sans-serif">SURYA'S</text>
          </svg>
          <span style={{ fontWeight: 700, fontSize: 22, color: '#1e3a8a', letterSpacing: 1 }}>SURYA'S MIB ENTERPRISES INTRANET</span>
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 700, marginTop: 100, padding: '48px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ marginBottom: 32, textAlign: 'center' }}>Internship Application</Title>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Full Name" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Full name is required' }}
              render={({ field }) => <Input {...field} placeholder="Enter your full name" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Phone Number" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: 'Phone number is required', pattern: { value: /^\d{10}$/, message: 'Enter a valid 10-digit phone number' } }}
              render={({ field }) => <Input {...field} placeholder="Enter your phone number" size="large" />}
            />
          </Form.Item>
          <Form.Item label="College" validateStatus={errors.college ? 'error' : ''} help={errors.college?.message}>
            <Controller
              name="college"
              control={control}
              defaultValue=""
              rules={{ required: 'College is required' }}
              render={({ field }) => <Input {...field} placeholder="Enter your college name" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Current Position" validateStatus={errors.position ? 'error' : ''} help={errors.position?.message}>
            <Controller
              name="position"
              control={control}
              defaultValue=""
              rules={{ required: 'Current position is required' }}
              render={({ field }) => <Input {...field} placeholder="e.g. Student, Graduate" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Experience" validateStatus={errors.experience ? 'error' : ''} help={errors.experience?.message}>
            <Controller
              name="experience"
              control={control}
              defaultValue=""
              rules={{ required: 'Experience is required' }}
              render={({ field }) => <Input {...field} placeholder="e.g. 0 years, 1 year internship" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Enter a valid email' } }}
              render={({ field }) => <Input {...field} placeholder="Enter your email" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Citizenship" validateStatus={errors.citizenship ? 'error' : ''} help={errors.citizenship?.message}>
            <Controller
              name="citizenship"
              control={control}
              defaultValue=""
              rules={{ required: 'Citizenship is required' }}
              render={({ field }) => <Input {...field} placeholder="Enter your citizenship" size="large" />}
            />
          </Form.Item>
          <Form.Item label="Role in the Company" validateStatus={errors.roleInCompany ? 'error' : ''} help={errors.roleInCompany?.message}>
            <Controller
              name="roleInCompany"
              control={control}
              defaultValue={companyRoles[0].value}
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <Select {...field} size="large">
                  {companyRoles.map((r) => (
                    <Option key={r.value} value={r.value}>{r.label}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Resume (PDF, DOC, DOCX)" required>
            <div {...getRootProps()} className={isDragActive ? styles.dropzoneActive : styles.dropzone}>
              <input {...getInputProps()} />
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <span style={{ fontSize: 32, color: '#1890ff' }}>📄</span>
                {file ? (
                  <span>{file.name}</span>
                ) : (
                  <span>Drag & drop your resume here, or click to select file</span>
                )}
              </Space>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
} 