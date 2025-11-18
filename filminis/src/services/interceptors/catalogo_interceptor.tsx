import { apiRequest } from './apiClient';

// 1. CORREÇÃO: Faça os campos opcionais aceitarem 'null' também
export type CatalogoItem = {
  id: number;
  nome: string;
  sobrenome?: string | null; // <-- Permite string, null, ou undefined
  url_foto?: string | null;  // <-- Permite string, null, ou undefined
};

// (Suas funções getGeneros, getAtores, etc. continuam iguais)

export async function getGeneros(): Promise<CatalogoItem[]> {
  return apiRequest('/generos');
}
export async function getAtores(): Promise<CatalogoItem[]> {
  return apiRequest('/atores');
}
export async function getDiretores(): Promise<CatalogoItem[]> {
  return apiRequest('/diretores');
}
export async function getNacionalidades(): Promise<CatalogoItem[]> {
  return apiRequest('/nacionalidades');
}

// 2. O tipo de retorno de getCatalogo agora usa o CatalogoItem corrigido
export type CatalogoData = {
    generos: CatalogoItem[];
    nacionalidades: CatalogoItem[];
    atores: CatalogoItem[];
    diretores: CatalogoItem[];
};

export async function getCatalogo(): Promise<CatalogoData> {
    try {
        const [generos, nacionalidades, atores, diretores] = await Promise.all([
            getGeneros(),
            getNacionalidades(),
            getAtores(),
            getDiretores()
        ]);
        return { generos, nacionalidades, atores, diretores };
    } catch (error) {
        console.error("Falha ao buscar catálogos:", error);
        throw new Error("Não foi possível carregar os dados do formulário.");
    }
}