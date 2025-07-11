import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { email: 'admin@mib.com', password: 'admin123', role: 'Admin', name: 'Admin User', department: 'Admin' },
  { email: 'rnd@mib.com', password: 'rnd123', role: 'User', name: 'R&D User', department: 'R&D' },
  { email: 'marketing@mib.com', password: 'marketing123', role: 'User', name: 'Marketing User', department: 'Marketing' },
  { email: 'technical@mib.com', password: 'technical123', role: 'User', name: 'Technical User', department: 'Technical' },
  { email: 'mic@mib.com', password: 'mic123', role: 'User', name: 'MIC User', department: 'MIC' },
  { email: 'newuser@mib.com', password: 'newuser123', role: 'NewUser', name: 'New User', department: '' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('mib_auth');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role, remember) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (found) {
      setUser(found);
      if (remember) {
        localStorage.setItem('mib_auth', JSON.stringify(found));
      }
      return { success: true, user: found };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mib_auth');
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 