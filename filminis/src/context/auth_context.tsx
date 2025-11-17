import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as authApi from '../services/interceptors/apiClient'; 

// O tipo de dado que o Context vai fornecer
type User = { id: number; nome: string; role: string };

// 1. ADICIONE isLoading AO TIPO
type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean; // <-- ADICIONE ISTO
  login: (userData: User, token: string) => void;
  logout: () => void;
};

// 1. Crie o Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Crie o "Provedor"
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 2. ADICIONE O ESTADO DE LOADING
  const [isLoading, setIsLoading] = useState(true); // <-- Começa como true

 
  useEffect(() => {
    // Simula uma pequena espera para garantir que tudo carregue (opcional mas bom)
    setTimeout(() => {
        const token = authApi.getAuthToken();
        const userInfo = authApi.getUserInfo();
        
        if (token && userInfo) {
            setUser(userInfo); 
            setIsLoggedIn(true);
        }
        // 3. TERMINE O LOADING (mesmo se não houver usuário)
        setIsLoading(false); // <-- ADICIONE ISTO
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