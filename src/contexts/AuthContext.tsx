import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User } from '../types';
import { getStoredToken, removeStoredToken, setStoredToken } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      // In a real app, you'd validate the token with your backend
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'Demo User'
      };
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      setStoredToken(mockToken);
      setUser(mockUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        email,
        name
      };
      
      setStoredToken(mockToken);
      setUser(mockUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};