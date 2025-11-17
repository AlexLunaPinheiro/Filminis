import { apiRequest } from './apiClient';

// (Tipos para os dados do dashboard, baseados no seu service)
export type StatsDashboard = {
    edicao: number;
    criacao: number;
    cadastrados: number;
    aberto: number;
};

export type SolicitacaoAdmin = {
    id: number;
    data_solicitacao: string;
    filme: string; // (Assumindo que o repo já trata isso)
    tipo: 'ADICAO' | 'EDICAO';
    usuario_nome: string; // (Assumindo que o repo já trata isso)
    status: string;
};

/**
 * (Admin) Busca as estatísticas do dashboard.
 * Requer token de Admin.
 */
export async function getAdminDashboardStats(): Promise<StatsDashboard> {
  return apiRequest('/admin/relatorio');
}

/**
 * (Admin) Busca todas as solicitações em aberto.
 * Requer token de Admin.
 */
export async function getAdminSolicitacoes(): Promise<SolicitacaoAdmin[]> {
  return apiRequest('/admin/solicitacoes');
}

/**
 * (Admin) Deleta um filme permanentemente pelo ID.
 * Requer token de Admin.
 */
export async function deleteFilmeById(id: string | number): Promise<{ message: string }> {
  return apiRequest(`/admin/filmes/${id}`, {
    method: 'DELETE',
  });
}