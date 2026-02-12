import { apiRequest } from './apiClient';

export type StatsDashboard = {
    edicao: number;
    criacao: number;
    cadastrados: number;
    aberto: number;
};

export type SolicitacaoAdmin = {
    id: number;
    data_solicitacao: string;
    filme: string; 
    tipo: 'ADICAO' | 'EDICAO';
    usuario_nome: string; 
    status: string;
};


export async function getAdminDashboardStats(): Promise<StatsDashboard> {
  return apiRequest('/admin/relatorio');
}

export async function getAdminSolicitacoes(): Promise<SolicitacaoAdmin[]> {
  return apiRequest('/admin/solicitacoes');
}

export async function deleteFilmeById(id: string | number): Promise<{ message: string }> {
  return apiRequest(`/admin/filmes/${id}`, {
    method: 'DELETE',
  });
}


type AcaoReview = 'APROVAR' | 'REJEITAR';


export async function reviewSolicitacao(id: number, acao: AcaoReview): Promise<{ message: string }> {
  return apiRequest(`/admin/solicitacoes/${id}/review`, {
    method: 'POST',
    body: JSON.stringify({ acao }), // Envia a ação no corpo
  });
}

export async function adminCreateFilme(payload: any): Promise<any> {
  return apiRequest('/admin/filmes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


export async function adminUpdateFilme(id: string | number, payload: any): Promise<any> {
  return apiRequest(`/admin/filmes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}