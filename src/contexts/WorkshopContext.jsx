import React, { createContext, useContext, useState } from 'react';

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);

  // Add a new workshop (admin)
  const addWorkshop = (workshop) => {
    setWorkshops(prev => [
      {
        ...workshop,
        id: Date.now(),
        applicants: [],
        // poster, speaker, topic, description, date, duration expected in workshop param
      },
      ...prev,
    ]);
  };

  // User applies to a workshop
  const applyToWorkshop = (workshopId, applicant) => {
    setWorkshops(prev => prev.map(w =>
      w.id === workshopId
        ? { ...w, applicants: [...w.applicants, { ...applicant, status: 'Pending' }] }
        : w
    ));
  };

  return (
    <WorkshopContext.Provider value={{
      workshops,
      setWorkshops,
      addWorkshop,
      applyToWorkshop,
    }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshops = () => useContext(WorkshopContext); 