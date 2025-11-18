import json
from config.db import get_db_connection
from repositories.solicitation_repository import SolicitacaoRepository
from repositories.relatory_repository import RelatorioRepository
from repositories.movie_repository import FilmeRepository

class AdminService:
    # No construtor, instancia todos os repositories que serão utilizados
    def __init__(self):
        self.solic_repo = SolicitacaoRepository()
        self.relatorio_repo = RelatorioRepository()
        self.filme_repo = FilmeRepository()

    # Busca as estatísticas principais para o painel de admin
    def get_relatorio_dashboard(self):
        return self.relatorio_repo.get_dashboard_stats()

    # Puxa todas as solicitações que ainda estão com status pendente
    def get_solicitacoes_abertas(self):
        return self.solic_repo.get_all_open()
        
    # Busca detalhes de uma solicitação específica.
    def get_detalhes_solicitacao(self, solic_id):
        solicitacao = self.solic_repo.get_details_by_id(solic_id)
        if solicitacao:
            solicitacao['payload'] = json.loads(solicitacao['payload'])
        return solicitacao

    # Simplesmente atualiza o status da solicitação para rejeitada
    def desaprovar_solicitacao(self, solic_id):
        return self.solic_repo.update_status(solic_id, 'REJEITADA')

    # Permite ao admin deletar um filme diretamente
    def admin_deletar_filme(self, filme_id):
        return self.filme_repo.admin_delete_filme(filme_id)

    def aprovar_solicitacao(self, solic_id):
        solicitacao = self.solic_repo.get_details_by_id(solic_id)
        
        # Garante que a solicitação existe e que ainda está pendente.
        if not solicitacao or solicitacao['status'] != 'PENDENTE':
            return False, "Solicitação inválida."

        # Prepara os dados da solicitação para serem usados
        payload = json.loads(solicitacao['payload'])
        
        # Roteia a aprovação: se for adicao, chama a função de criar se for edicao, chama a de editar
        if solicitacao['tipo'] == 'ADICAO':
            return self.admin_criar_filme(payload, aprovar_solic_id=solic_id)
        elif solicitacao['tipo'] == 'EDICAO':
            return self.admin_editar_filme(solicitacao['filme_id_alvo'], payload, aprovar_solic_id=solic_id)
            
        return False, "Tipo de solicitação desconhecido."

    # Função interna para cuidar das tabelas de ligação ator, diretor etc
    def _processar_relacionamentos(self, cursor, filme_id, payload):
        """Função auxiliar para lidar com tabelas M:N (Atores, Diretores, Gêneros)"""
        cursor.execute("DELETE FROM Filme_Ator WHERE id_filme = %s", (filme_id,))
        cursor.execute("DELETE FROM Filme_Diretor WHERE id_filme = %s", (filme_id,))
        cursor.execute("DELETE FROM Filme_Genero WHERE id_filme = %s", (filme_id,))
        
        if 'atores_ids' in payload:
            for ator_id in payload['atores_ids']:
                cursor.execute("INSERT INTO Filme_Ator (id_filme, id_ator) VALUES (%s, %s)", (filme_id, ator_id))
        
        if 'diretores_ids' in payload:
            for dir_id in payload['diretores_ids']:
                cursor.execute("INSERT INTO Filme_Diretor (id_filme, id_diretor) VALUES (%s, %s)", (filme_id, dir_id))

        if 'generos_ids' in payload:
            for gen_id in payload['generos_ids']:
                cursor.execute("INSERT INTO Filme_Genero (id_filme, id_genero) VALUES (%s, %s)", (filme_id, gen_id))


    # Cria um filme novo
    def admin_criar_filme(self, payload, aprovar_solic_id=None):
        conn = None
        try:
            conn = get_db_connection()
            # transação funciona com ou tudo funciona, ou nada é salvo
            conn.start_transaction()
            cursor = conn.cursor()
            
            filme_query = """
                INSERT INTO Filme (titulo, sinopse, orcamento, tempo_duracao, ano_lancamento, url_poster, url_capa)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            filme_dados = (
                payload['titulo'], payload.get('sinopse'), payload['orcamento'], payload['tempo_duracao'],
                payload['ano_lancamento'], payload.get('url_poster'), payload.get('url_capa')
            )
            cursor.execute(filme_query, filme_dados)
            # Pega o ID do filme que acbou de ser criado
            filme_id = cursor.lastrowid
            
            # Chama a função auxiliar para lidar com atores, generos etc
            self._processar_relacionamentos(cursor, filme_id, payload)
            
            # Se isso veio de uma solicitação, marca como aprovada
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


    # Atualiza um filme existent e usa transação manual
    def admin_editar_filme(self, filme_id, payload, aprovar_solic_id=None):
        conn = None
        try:
            conn = get_db_connection()
            conn.start_transaction()
            cursor = conn.cursor()
            
            # update nos dados principais do filme 
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
            
            # Re-processa os relacionamentos (limpa antigos, insere novos)
            self._processar_relacionamentos(cursor, filme_id, payload)
            
            # Se veio de uma solicitação, marca ela como aprovada
            if aprovar_solic_id:
                cursor.execute(
                    "UPDATE Solicitacao SET status = 'APROVADA', data_decisao = CURRENT_TIMESTAMP WHERE id = %s", 
                    (aprovar_solic_id,)
                )
    
            conn.commit()
            return True, "Filme atualizado com sucesso."
        except Exception as e:
            # Se der ruim desfaz
            if conn: conn.rollback()
            return False, f"Erro ao editar filme: {e}"
        finally:
            if conn: conn.close()