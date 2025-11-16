import json
from config.db import get_db_connection
from repositories.solicitation_repository import SolicitacaoRepository
from repositories.relatory_repository import RelatorioRepository
from repositories.movie_repository import FilmeRepository

class AdminService:
    def __init__(self):
        self.solic_repo = SolicitacaoRepository()
        self.relatorio_repo = RelatorioRepository()
        self.filme_repo = FilmeRepository()

    def get_relatorio_dashboard(self):
        return self.relatorio_repo.get_dashboard_stats()

    def get_solicitacoes_abertas(self):
        return self.solic_repo.get_all_open()
        
    def get_detalhes_solicitacao(self, solic_id):
        solicitacao = self.solic_repo.get_details_by_id(solic_id)
        if solicitacao:
            # Converte o payload de string JSON para dict
            solicitacao['payload'] = json.loads(solicitacao['payload'])
        return solicitacao

    def desaprovar_solicitacao(self, solic_id):
        return self.solic_repo.update_status(solic_id, 'REJEITADA')

    def admin_deletar_filme(self, filme_id):
        return self.filme_repo.admin_delete_filme(filme_id)

    def aprovar_solicitacao(self, solic_id):
        solicitacao = self.solic_repo.get_details_by_id(solic_id)
        if not solicitacao or solicitacao['status'] != 'PENDENTE':
            return False, "Solicitação inválida."

        payload = json.loads(solicitacao['payload'])
        
        if solicitacao['tipo'] == 'ADICAO':
            return self.admin_criar_filme(payload, aprovar_solic_id=solic_id)
        elif solicitacao['tipo'] == 'EDICAO':
            return self.admin_editar_filme(solicitacao['filme_id_alvo'], payload, aprovar_solic_id=solic_id)
            
        return False, "Tipo de solicitação desconhecido."

    # Nota: As funções _processar_relacionamentos, admin_criar_filme e admin_editar_filme
    # são as mais complexas pois exigem transações manuais.

    def _processar_relacionamentos(self, cursor, filme_id, payload):
        """Função auxiliar para lidar com tabelas M:N (Atores, Diretores, Gêneros)"""
        # Limpa relações antigas
        cursor.execute("DELETE FROM Filme_Ator WHERE id_filme = %s", (filme_id,))
        cursor.execute("DELETE FROM Filme_Diretor WHERE id_filme = %s", (filme_id,))
        cursor.execute("DELETE FROM Filme_Genero WHERE id_filme = %s", (filme_id,))
        
        # Insere novos IDs (Payload deve enviar listas de IDs)
        if 'atores_ids' in payload:
            for ator_id in payload['atores_ids']:
                cursor.execute("INSERT INTO Filme_Ator (id_filme, id_ator) VALUES (%s, %s)", (filme_id, ator_id))
        
        if 'diretores_ids' in payload:
            for dir_id in payload['diretores_ids']:
                cursor.execute("INSERT INTO Filme_Diretor (id_filme, id_diretor) VALUES (%s, %s)", (filme_id, dir_id))

        if 'generos_ids' in payload:
            for gen_id in payload['generos_ids']:
                cursor.execute("INSERT INTO Filme_Genero (id_filme, id_genero) VALUES (%s, %s)", (filme_id, gen_id))


    def admin_criar_filme(self, payload, aprovar_solic_id=None):
        conn = None
        try:
            conn = get_db_connection()
            conn.start_transaction()
            cursor = conn.cursor()
            
            # 1. Inserir Filme
            filme_query = """
                INSERT INTO Filme (titulo, sinopse, orcamento, tempo_duracao, ano_lancamento, url_poster, url_capa)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            filme_dados = (
                payload['titulo'], payload.get('sinopse'), payload['orcamento'], payload['tempo_duracao'],
                payload['ano_lancamento'], payload.get('url_poster'), payload.get('url_capa')
            )
            cursor.execute(filme_query, filme_dados)
            filme_id = cursor.lastrowid
            
            # 2. Processar relacionamentos
            self._processar_relacionamentos(cursor, filme_id, payload)
            
            # 3. Se for aprovação de solicitação, atualiza o status
            if aprovar_solic_id:
                cursor.execute(
                    "UPDATE Solicitacao SET status = 'APROVADA', data_decisao = CURRENT_TIMESTAMP WHERE id = %s", 
                    (aprovar_solic_id,)
                )
            
            conn.commit()
            return True, "Filme criado com sucesso."
        except Exception as e:
            if conn: conn.rollback()
            return False, f"Erro ao criar filme: {e}"
        finally:
            if conn: conn.close()


    def admin_editar_filme(self, filme_id, payload, aprovar_solic_id=None):
        conn = None
        try:
            conn = get_db_connection()
            conn.start_transaction()
            cursor = conn.cursor()
            
            # 1. Atualizar Filme
            filme_query = """
                UPDATE Filme SET 
                    titulo = %s, sinopse = %s, orcamento = %s, tempo_duracao = %s, 
                    ano_lancamento = %s, url_poster = %s, url_capa = %s
                WHERE id = %s
            """
            filme_dados = (
                payload['titulo'], payload.get('sinopse'), payload['orcamento'], payload['tempo_duracao'],
                payload['ano_lancamento'], payload.get('url_poster'), payload.get('url_capa'),
                filme_id
            )
            cursor.execute(filme_query, filme_dados)
            
            # 2. Processar relacionamentos (limpa e recria)
            self._processar_relacionamentos(cursor, filme_id, payload)
            
            # 3. Se for aprovação de solicitação, atualiza o status
            if aprovar_solic_id:
                cursor.execute(
                    "UPDATE Solicitacao SET status = 'APROVADA', data_decisao = CURRENT_TIMESTAMP WHERE id = %s", 
                    (aprovar_solic_id,)
                )
            
            conn.commit()
            return True, "Filme atualizado com sucesso."
        except Exception as e:
            if conn: conn.rollback()
            return False, f"Erro ao editar filme: {e}"
        finally:
            if conn: conn.close()