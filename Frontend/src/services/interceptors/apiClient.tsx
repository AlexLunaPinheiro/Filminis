// A base de todas as nossas chamadas de API
const BASE_URL = 'http://localhost:8000';

type UserStorage = {
  id: number;
  nome: string;
  role: string;
};

// Funções de Armazenamento no localStorage

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('authToken');
}

export function setUserInfo(user: UserStorage): void {
  localStorage.setItem('userInfo', JSON.stringify(user));
}

export function getUserInfo(): UserStorage | null {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
}

export function removeUserInfo(): void {
  localStorage.removeItem('userInfo');
}

//  Função Principal de Requisição
export async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (!(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    if (response.status === 204) { 
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Erro na requisição API:", error);
    throw error; // Re-lança o erro para o componente que chamou
  }
}