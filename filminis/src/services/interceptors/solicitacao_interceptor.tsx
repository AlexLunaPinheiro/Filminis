import { apiRequest } from './apiClient';

export type SolicitacaoUsuario = {
  id: number;
  tipo: 'ADICAO' | 'EDICAO';
  status: 'Em análise' | 'Aprovado' | 'Reprovado' | 'Desaprovado'; // Backend usa 'Desaprovado'
  data_solicitacao: string;
  filme: string; // O backend já trata o nome do filme
};

/** Requer token */
export async function getMinhasSolicitacoes(): Promise<SolicitacaoUsuario[]> {
  return apiRequest('/solicitacoes');
}

/** Requer token */
export async function createSolicitacao(tipo: 'ADICAO' | 'EDICAO', payload: any): Promise<any> {
  return apiRequest('/solicitacoes', {
    method: 'POST',
    body: JSON.stringify({ tipo, payload }),
  });
}