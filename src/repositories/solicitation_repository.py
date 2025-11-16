from config.db import execute_query

class SolicitacaoRepository:

    def create(self, usuario_id, tipo, payload_json, filme_id_alvo=None):
        query = """
            INSERT INTO Solicitacao (usuario_id, tipo, payload, filme_id_alvo)
            VALUES (%s, %s, %s, %s)
        """
        return execute_query(query, (usuario_id, tipo, payload_json, filme_id_alvo), commit=True)

    def get_by_usuario_id(self, usuario_id):
        # O status "Em análise" do Figma é o "PENDENTE" no banco
        query = """
            SELECT s.id, s.tipo, 
            CASE 
                WHEN s.status = 'PENDENTE' THEN 'Em análise'
                WHEN s.status = 'APROVADA' THEN 'Aprovado'
                WHEN s.status = 'REJEITADA' THEN 'Desaprovado'
            END AS status, 
            s.data_solicitacao, 
            COALESCE(f.titulo, JSON_UNQUOTE(s.payload->"$.titulo")) AS filme
            FROM Solicitacao s
            LEFT JOIN Filme f ON s.filme_id_alvo = f.id
            WHERE s.usuario_id = %s
            ORDER BY s.data_solicitacao DESC
        """
        return execute_query(query, (usuario_id,), fetchall=True)

    def get_all_open(self):
        query = """
            SELECT s.id, s.tipo, s.data_solicitacao, 
                   CONCAT(u.nome, ' ', u.sobrenome) AS usuario, 
                   COALESCE(f.titulo, JSON_UNQUOTE(s.payload->"$.titulo")) AS filme
            FROM Solicitacao s
            JOIN Usuario u ON s.usuario_id = u.id
            LEFT JOIN Filme f ON s.filme_id_alvo = f.id
            WHERE s.status = 'PENDENTE'
            ORDER BY s.data_solicitacao ASC
        """
        return execute_query(query, fetchall=True)
        
    def get_details_by_id(self, solic_id):
        query = """
            SELECT s.*, CONCAT(u.nome, ' ', u.sobrenome) as usuario_nome
            FROM Solicitacao s
            JOIN Usuario u ON s.usuario_id = u.id
            WHERE s.id = %s
        """
        return execute_query(query, (solic_id,), fetchone=True)
        
    def update_status(self, solic_id, status):
        query = "UPDATE Solicitacao SET status = %s, data_decisao = CURRENT_TIMESTAMP WHERE id = %s"
        return execute_query(query, (status, solic_id), commit=True)