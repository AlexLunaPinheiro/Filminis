import { apiRequest } from './apiClient';


export type CatalogoItem = {
  id: number;
  nome: string;
  sobrenome?: string | null;
  url_foto?: string | null;  
};


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