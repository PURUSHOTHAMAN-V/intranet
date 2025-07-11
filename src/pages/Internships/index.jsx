import React, { useState } from 'react';
import { Form, Input, Button, Typography, Modal, Select, message, Space, Card } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Internships.module.css';
import { useNavigate } from 'react-router-dom';
import ApplyInternship from './Apply';
import AdminInternship from './AdminInternship';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const companyInfo = {
  name: "SURYA'S MIB ENTERPRISES",
  about: "SURYA'S MIB ENTERPRISES is a leading innovator in software development, specializing in web and mobile solutions for global clients. We foster a culture of learning, creativity, and growth.",
  image: null, // Will use inline SVG below
};

const companyRoles = [
  { value: 'Marketing', label: 'Marketing' },
  { value: 'R&D', label: 'R&D' },
  { value: 'Technical', label: 'Technical' },
  { value: 'MIC', label: 'MIC' },
];

export { ApplyInternship };

export default function InternshipApplication() {
  const { role } = useAuth();
  if (role === 'Admin') return <AdminInternship />;
  if (role === 'NewUser' || role === 'User') {
    const navigate = useNavigate();
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, margin: 0, overflow: 'hidden', position: 'relative' }}>
        <Button
          onClick={() => navigate('/internships/apply')}
          style={{ position: 'absolute', top: 32, right: 48, zIndex: 10, background: '#1e3a8a', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 18, padding: '8px 32px', boxShadow: '0 2px 8px rgba(30,41,59,0.08)' }}
          size="large"
        >
          Apply Now
        </Button>
        <div style={{ maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 160 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="4"/>
              <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">MIB</text>
              <text x="50%" y="70%" textAnchor="middle" fill="#fbbf24" fontSize="13" fontFamily="Arial, sans-serif">SURYA'S</text>
            </svg>
          </div>
          <Title level={2} style={{ marginBottom: 16, textAlign: 'center' }}>Internship Application</Title>
          <Paragraph style={{ fontSize: 18, marginBottom: 18, textAlign: 'center' }}>
            SURYA'S MIB ENTERPRISES is a leader in digital transformation, empowering businesses with innovative web and mobile solutions. Our internship program is designed to nurture talent and provide real-world experience in a collaborative environment.
          </Paragraph>
          <Paragraph style={{ fontSize: 18, marginBottom: 18, textAlign: 'center' }}>
            As an intern, you'll work alongside industry experts, contribute to impactful projects, and develop skills that will accelerate your career. We value creativity, curiosity, and a passion for learning.
          </Paragraph>
          <Paragraph style={{ fontSize: 18, marginBottom: 18, textAlign: 'center' }}>
            Our culture is built on respect, diversity, and continuous improvement. We encourage interns to bring fresh ideas and take initiative, ensuring a rewarding and supportive experience.
          </Paragraph>
          <Paragraph style={{ fontSize: 18, marginBottom: 32, textAlign: 'center' }}>
            Ready to take the next step? Click the Apply Now button to begin your application and join us on a journey of growth and innovation at SURYA'S MIB ENTERPRISES.
          </Paragraph>
        </div>
        <Button
          onClick={() => navigate('/internships/apply')}
          style={{ marginBottom: 48, background: '#1e3a8a', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 18, padding: '12px 48px', boxShadow: '0 2px 8px rgba(30,41,59,0.08)' }}
          size="large"
        >
          Apply Now
        </Button>
      </div>
    );
  }
  return null;
} 