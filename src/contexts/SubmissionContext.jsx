import React, { createContext, useContext, useState } from 'react';

const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [internshipApplications, setInternshipApplications] = useState([]);

  // Leave
  const addLeaveRequest = (request) => {
    setLeaveRequests(prev => [request, ...prev]);
  };

  // Internship
  const addInternshipApplication = (application) => {
    setInternshipApplications(prev => [application, ...prev]);
  };

  return (
    <SubmissionContext.Provider value={{
      leaveRequests,
      setLeaveRequests,
      addLeaveRequest,
      internshipApplications,
      setInternshipApplications,
      addInternshipApplication,
    }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissions = () => useContext(SubmissionContext); 