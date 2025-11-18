from config.db import execute_query

class RelatorioRepository:
    def get_dashboard_stats(self):
        query_filmes = "SELECT COUNT(*) as total_filmes FROM Filme"
        query_sol_aberto = "SELECT COUNT(*) as total FROM Solicitacao WHERE status = 'PENDENTE'"
        query_sol_adicao = "SELECT COUNT(*) as total FROM Solicitacao WHERE status = 'PENDENTE' AND tipo = 'ADICAO'"
        query_sol_edicao = "SELECT COUNT(*) as total FROM Solicitacao WHERE status = 'PENDENTE' AND tipo = 'EDICAO'"
        
        stats = {
            'cadastrados': execute_query(query_filmes, fetchone=True)['total_filmes'],
            'aberto': execute_query(query_sol_aberto, fetchone=True)['total'],
            'criacao': execute_query(query_sol_adicao, fetchone=True)['total'],
            'edicao': execute_query(query_sol_edicao, fetchone=True)['total']
        }
        return stats