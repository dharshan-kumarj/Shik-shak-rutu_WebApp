import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/client';

type User = {
  fullName: string;
  emailOrPhone: string;
  state: string;
  subject: string;
  grade: string;
  schoolType: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('shiksha_token');
    const storedUser = localStorage.getItem('shiksha_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('shiksha_token', newToken);
    localStorage.setItem('shiksha_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('shiksha_token');
    localStorage.removeItem('shiksha_user');
    localStorage.removeItem('shiksha_language_selected');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
