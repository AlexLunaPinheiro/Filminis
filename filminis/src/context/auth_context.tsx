import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as authApi from '../services/interceptors/apiClient'; 

// O tipo de dado que o Context vai fornecer
// CORREÇÃO: Remova 'sobrenome' e 'email'.
type User = { id: number; nome: string; role: string };

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

// 1. Crie o Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Crie o "Provedor"
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Na primeira vez que o App carrega, verifique o localStorage
  useEffect(() => {
    const token = authApi.getAuthToken();
    const userInfo = authApi.getUserInfo();
    if (token && userInfo) {
      // Agora 'userInfo' (que é {id, nome, role})
      // bate com o tipo 'User', e o erro desaparece.
      setUser(userInfo); 
      setIsLoggedIn(true);
    }
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
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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