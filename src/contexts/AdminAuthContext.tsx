import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminLogin as apiLogin, adminLogout as apiLogout } from '@/services/adminApi';

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const storedUser = localStorage.getItem(ADMIN_USER_KEY);
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      
      if (response.success && response.data) {
        localStorage.setItem(ADMIN_TOKEN_KEY, response.data.token);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
