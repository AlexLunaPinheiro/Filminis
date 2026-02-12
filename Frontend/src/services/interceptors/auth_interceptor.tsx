import { apiRequest } from './apiClient';

// Tipo para a resposta do /login
export type UserLoginData = {
  token: string;
  user: {
    id: number;
    nome: string;
    role: string;
  };
};

// Tipo para a resposta do /profile
export type UserProfileData = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  role: string;
};

/**
 * Tenta fazer login no backend.
 */
export async function login(email: string, password: string): Promise<UserLoginData> {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}


export async function getMyProfile(): Promise<UserProfileData> {
  return apiRequest('/profile'); 
}