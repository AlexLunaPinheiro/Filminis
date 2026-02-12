import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as authApi from '../services/interceptors/apiClient'; 

// O tipo de dado que o Context vai fornecer
type User = { id: number; nome: string; role: string };

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    setTimeout(() => {
        const token = authApi.getAuthToken();
        const userInfo = authApi.getUserInfo();
        
        if (token && userInfo) {
            setUser(userInfo); 
            setIsLoggedIn(true);
        }
    
        setIsLoading(false);
    }, 500); // 500ms de "loading"
  }, []);

  const login = (userData: User, token: string) => {
    authApi.setAuthToken(token);
    authApi.setUserInfo(userData);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    authApi.removeAuthToken();
    authApi.removeUserInfo();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    // 4. FORNEÇA o isLoading
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Crie o "Hook" para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}