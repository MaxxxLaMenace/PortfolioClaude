import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axios';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('portfolio_token');
    const storedUser = localStorage.getItem('portfolio_user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setToken(storedToken);
        setUser(parsedUser);
      } catch {
        logout();
      }
    }
    setIsLoading(false);
  }, [logout]);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem('portfolio_token', newToken);
    localStorage.setItem('portfolio_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
