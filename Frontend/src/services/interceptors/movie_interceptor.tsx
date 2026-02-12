import { apiRequest } from './apiClient';

export type FilmeListado = {
  id: number;
  titulo: string;
  ano_lancamento: number;
  url_poster: string;
  url_capa: string;
  tempo_duracao: string;
  produtoras: string | null;
};


export type FilmeDetalhado = {
  id: number;
  titulo: string;
  sinopse: string | null;
  orcamento: number | null; 
  tempo_duracao: string | null; 
  ano_lancamento: number;
  url_poster: string | null;
  url_capa: string | null;
  generos: {
    id: number; 
    nome: string;
  }[];
  atores: {
    id: number;
    nome: string;
    sobrenome?: string | null; 
    url_foto?: string | null; 
  }[];
  diretores: {
    id: number;
    nome: string;
    sobrenome?: string | null; 
    url_foto?: string | null;  
  }[];
  produtoras: {
    id: number;
    nome: string;
  }[];
};


export async function getAllFilmes(): Promise<FilmeListado[]> {
  return apiRequest('/filmes');
}

export async function getFilmeById(id: string | number): Promise<FilmeDetalhado> {
  return apiRequest(`/filmes/${id}`);
}

export async function searchFilmes(params: Record<string, string | string[]>): Promise<FilmeListado[]> {
  const query = new URLSearchParams();
  
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