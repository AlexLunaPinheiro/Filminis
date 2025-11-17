import { apiRequest } from './apiClient';

// Tipo para o filme retornado pela lista (simplificado)
export type FilmeListado = {
  id: number;
  titulo: string;
  ano_lancamento: number;
  url_poster: string;
  url_capa: string;
  tempo_duracao: string;
  produtoras: string | null;
};

// Tipo para os detalhes completos de um filme
export type FilmeDetalhado = {
  id: number;
  titulo: string;
  sinopse: string;
  orcamento: number;
  tempo_duracao: string; 
  ano_lancamento: number;
  url_poster: string;
  url_capa: string;
  generos: { nome: string }[];
  atores: { nome: string; sobrenome: string; url_foto: string }[];
  diretores: { nome: string; sobrenome: string; url_foto: string }[];
  produtoras: { id: number; nome: string }[];
};


export async function getAllFilmes(): Promise<FilmeListado[]> {
  return apiRequest('/filmes');
}


export async function getFilmeById(id: string | number): Promise<FilmeDetalhado> {
  return apiRequest(`/filmes/${id}`);
}

/**
 * Busca filmes com filtros.
 * @param params 
 */
export async function searchFilmes(params: Record<string, string | string[]>): Promise<FilmeListado[]> {
  const query = new URLSearchParams();
  
  // Constrói a query string
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      
      value.forEach(v => query.append(key, v));
    } else if (value) {
      query.append(key, value);
    }
  }

  const queryString = query.toString();
  return apiRequest(`/filmes?${queryString}`);
}