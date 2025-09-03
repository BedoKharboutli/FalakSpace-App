import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, userData, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  // User data functions
  addFavorite: (planetId: string) => boolean;
  removeFavorite: (planetId: string) => boolean;
  isFavorited: (planetId: string) => boolean;
  saveNote: (planetId: string, note: string) => boolean;
  getNote: (planetId: string) => string;
  getFavorites: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = auth.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (name: string, email: string, password: string) => {
    return auth.register(name, email, password);
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  const addFavorite = (planetId: string): boolean => {
    const success = userData.addFavorite(planetId);
    return success;
  };

  const removeFavorite = (planetId: string): boolean => {
    const success = userData.removeFavorite(planetId);
    return success;
  };

  const isFavorited = (planetId: string): boolean => {
    return userData.isFavorited(planetId);
  };

  const saveNote = (planetId: string, note: string): boolean => {
    return userData.saveNote(planetId, note);
  };

  const getNote = (planetId: string): string => {
    return userData.getNote(planetId);
  };

  const getFavorites = (): string[] => {
    const data = userData.getUserData();
    return data.favorites;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    addFavorite,
    removeFavorite,
    isFavorited,
    saveNote,
    getNote,
    getFavorites,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
