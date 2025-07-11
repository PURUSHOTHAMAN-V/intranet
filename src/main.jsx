import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/global.css';
import { AuthProvider } from './contexts/AuthContext';
import { SubmissionProvider } from './contexts/SubmissionContext';
import { WorkshopProvider } from './contexts/WorkshopContext';
import { ReportsProvider } from './contexts/ReportsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReportsProvider>
      <WorkshopProvider>
        <AuthProvider>
          <SubmissionProvider>
            <App />
          </SubmissionProvider>
        </AuthProvider>
      </WorkshopProvider>
    </ReportsProvider>
  </StrictMode>,
)
