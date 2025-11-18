from config.db import execute_query

class FilmeRepository:
    
    def get_all(self):
        # Query para Home (Carrossel) e Sliders
        query = """
            SELECT
                f.id, f.titulo, f.ano_lancamento, f.url_poster, f.tempo_duracao, f.url_capa,
                GROUP_CONCAT(DISTINCT p.nome SEPARATOR ', ') AS produtoras
            FROM Filme f
            LEFT JOIN Filme_Produtora fp ON f.id = fp.id_filme
            LEFT JOIN Produtora p ON fp.id_produtora = p.id
            GROUP BY f.id, f.titulo, f.ano_lancamento, f.url_poster, f.tempo_duracao, f.url_capa
            ORDER BY f.titulo
        """
        return execute_query(query, fetchall=True)

    def get_details_by_id(self, filme_id):
        # Query para a página de Detalhes do Filme
        query_filme = "SELECT * FROM Filme WHERE id = %s"
        filme = execute_query(query_filme, (filme_id,), fetchone=True)
        if not filme:
            return None
            
        filme['generos'] = self.get_generos_for_filme(filme_id)
        filme['atores'] = self.get_atores_for_filme(filme_id)
        filme['diretores'] = self.get_diretores_for_filme(filme_id)
        filme['produtoras'] = self.get_produtoras_for_filme(filme_id) 
        return filme

    def get_generos_for_filme(self, filme_id):
        query = "SELECT g.id, g.nome FROM Genero g JOIN Filme_Genero fg ON g.id = fg.id_genero WHERE fg.id_filme = %s"
        return execute_query(query, (filme_id,), fetchall=True)

    def get_atores_for_filme(self, filme_id):
        query = "SELECT a.id, a.nome, a.sobrenome, a.url_foto FROM Ator a JOIN Filme_Ator fa ON a.id = fa.id_ator WHERE fa.id_filme = %s"
        return execute_query(query, (filme_id,), fetchall=True)

    def get_diretores_for_filme(self, filme_id):
        query = "SELECT d.id, d.nome, d.sobrenome, d.url_foto FROM Diretor d JOIN Filme_Diretor fd ON d.id = fd.id_diretor WHERE fd.id_filme = %s"
        return execute_query(query, (filme_id,), fetchall=True)

    def get_produtoras_for_filme(self, filme_id):
        query = "SELECT p.id, p.nome FROM Produtora p JOIN Filme_Produtora fp ON p.id = fp.id_produtora WHERE fp.id_filme = %s"
        return execute_query(query, (filme_id,), fetchall=True)

    def filter_filmes(self, params):
        # Query para a página de Busca
        base_query = """
            SELECT
                f.id, f.titulo, f.ano_lancamento, f.url_poster, f.tempo_duracao,
                GROUP_CONCAT(DISTINCT p.nome SEPARATOR ', ') AS produtoras
            FROM Filme f
            LEFT JOIN Filme_Genero fg ON f.id = fg.id_filme
            LEFT JOIN Genero g ON fg.id_genero = g.id
            LEFT JOIN Filme_Diretor fd ON f.id = fd.id_filme
            LEFT JOIN Diretor d ON fd.id_diretor = d.id
            LEFT JOIN Filme_Ator fa ON f.id = fa.id_ator
            LEFT JOIN Ator a ON fa.id_ator = a.id
            LEFT JOIN Filme_Produtora fp ON f.id = fp.id_filme
            LEFT JOIN Produtora p ON fp.id_produtora = p.id
            WHERE 1=1
        """
        query_params = []
        
        if params.get('nome'):
            base_query += " AND f.titulo LIKE %s"
            query_params.append(f"%{params['nome'][0]}%")
        if params.get('genero'):
            generos = params['genero']
            base_query += " AND g.nome IN ({})".format(", ".join(["%s"] * len(generos)))
            query_params.extend(generos)
        if params.get('ator'):
            ator_nome = f"%{params['ator'][0]}%"
            base_query += " AND (a.nome LIKE %s OR a.sobrenome LIKE %s)"
            query_params.extend([ator_nome, ator_nome])
        if params.get('diretor'):
            diretor_nome = f"%{params['diretor'][0]}%"
            base_query += " AND (d.nome LIKE %s OR d.sobrenome LIKE %s)"
            query_params.extend([diretor_nome, diretor_nome])
        if params.get('data'):
            base_query += " AND f.ano_lancamento = %s"
            query_params.append(params['data'][0])
        
        base_query += " GROUP BY f.id, f.titulo, f.ano_lancamento, f.url_poster, f.tempo_duracao ORDER BY f.titulo"
        return execute_query(base_query, tuple(query_params), fetchall=True)

    def admin_delete_filme(self, filme_id):
        query = "DELETE FROM Filme WHERE id = %s"
        return execute_query(query, (filme_id,), commit=True)

    # --- FUNÇÕES DE CATÁLOGO (ESTAVAM FALTANDO) ---

    def get_all_generos(self):
        query = "SELECT id, nome FROM Genero ORDER BY nome"
        return execute_query(query, fetchall=True)

    def get_all_atores(self):
        query = "SELECT id, nome, sobrenome, url_foto FROM Ator ORDER BY nome"
        return execute_query(query, fetchall=True)

    def get_all_diretores(self):
        query = "SELECT id, nome, sobrenome, url_foto FROM Diretor ORDER BY nome"
        return execute_query(query, fetchall=True)

    def get_all_nacionalidades(self):
        query = "SELECT id, nome FROM Nacionalidade ORDER BY nome"
        return execute_query(query, fetchall=True)