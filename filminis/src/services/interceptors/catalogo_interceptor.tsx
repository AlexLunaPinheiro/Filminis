import { apiRequest } from './apiClient';

export type CatalogoItem = {
  id: number;
  nome: string;
  sobrenome?: string;
  url_foto?: string;
};

/**
 * Busca a lista de todos os Gêneros.
 */
export async function getGeneros(): Promise<CatalogoItem[]> {
  return apiRequest('/generos');
}

/**
 * Busca a lista de todos os Atores.
 */
export async function getAtores(): Promise<CatalogoItem[]> {
  return apiRequest('/atores');
}

/**
 * Busca a lista de todos os Diretores.
 */
export async function getDiretores(): Promise<CatalogoItem[]> {
  return apiRequest('/diretores');
}

/**
 * Busca a lista de todas as Nacionalidades.
 */
export async function getNacionalidades(): Promise<CatalogoItem[]> {
  return apiRequest('/nacionalidades');
}