import React, { useRef, useState } from 'react';
import { Card, Button, Typography, message } from 'antd';

const { Title, Paragraph } = Typography;

export default function Attendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    if (!streaming && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCaptured(true);
      message.success('Attendance marked! (Face verified - mock)');
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: 32, minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ maxWidth: 480, width: '100%', borderRadius: 16, boxShadow: '0 4px 32px rgba(30,41,59,0.08)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Attendance</Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
          Please verify your face to mark your attendance.
        </Paragraph>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: 320, height: 240, borderRadius: 12, background: '#222' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 24, width: 200 }}
            onClick={capturePhoto}
            disabled={captured}
          >
            {captured ? 'Attendance Marked' : 'Mark Attendance'}
          </Button>
        </div>
      </Card>
    </div>
  );
} 