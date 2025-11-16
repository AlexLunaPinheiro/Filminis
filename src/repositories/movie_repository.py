from config.db import execute_query

class FilmeRepository:
    
    def get_all(self):
        query = "SELECT id, titulo, ano_lancamento, url_poster FROM Filme ORDER BY titulo"
        return execute_query(query, fetchall=True)

    def get_details_by_id(self, filme_id):
        # Query principal
        query_filme = "SELECT * FROM Filme WHERE id = %s"
        filme = execute_query(query_filme, (filme_id,), fetchone=True)
        if not filme:
            return None
            
        # Queries relacionadas
        filme['generos'] = execute_query("SELECT g.nome FROM Genero g JOIN Filme_Genero fg ON g.id = fg.id_genero WHERE fg.id_filme = %s", (filme_id,), fetchall=True)
        filme['atores'] = execute_query("SELECT a.nome, a.sobrenome, a.url_foto FROM Ator a JOIN Filme_Ator fa ON a.id = fa.id_ator WHERE fa.id_filme = %s", (filme_id,), fetchall=True)
        filme['diretores'] = execute_query("SELECT d.nome, d.sobrenome, d.url_foto FROM Diretor d JOIN Filme_Diretor fd ON d.id = fd.id_diretor WHERE fd.id_filme = %s", (filme_id,), fetchall=True)
        
        return filme

    def filter_filmes(self, params):
        base_query = """
            SELECT DISTINCT f.id, f.titulo, f.ano_lancamento, f.url_poster
            FROM Filme f
            LEFT JOIN Filme_Genero fg ON f.id = fg.id_filme
            LEFT JOIN Genero g ON fg.id_genero = g.id
            LEFT JOIN Filme_Diretor fd ON f.id = fd.id_filme
            LEFT JOIN Diretor d ON fd.id_diretor = d.id
            LEFT JOIN Filme_Ator fa ON f.id = fa.id_ator
            LEFT JOIN Ator a ON fa.id_ator = a.id
            WHERE 1=1
        """
        query_params = []
        
        if 'nome' in params:
            base_query += " AND f.titulo LIKE %s"
            query_params.append(f"%{params['nome'][0]}%")
            
        if 'genero' in params:
            # Filtro por múltiplos gêneros (ex: ?genero=Ação&genero=Comédia)
            generos = params['genero']
            base_query += " AND g.nome IN ({})".format(", ".join(["%s"] * len(generos)))
            query_params.extend(generos)

        if 'ator' in params:
            base_query += " AND (a.nome LIKE %s OR a.sobrenome LIKE %s)"
            query_params.extend([f"%{params['ator'][0]}%", f"%{params['ator'][0]}%"])

        if 'diretor' in params:
            base_query += " AND (d.nome LIKE %s OR d.sobrenome LIKE %s)"
            query_params.extend([f"%{params['diretor'][0]}%", f"%{params['diretor'][0]}%"])

        if 'data' in params:
            base_query += " AND f.ano_lancamento = %s"
            query_params.append(params['data'][0])
            
        return execute_query(base_query, tuple(query_params), fetchall=True)

    def admin_delete_filme(self, filme_id):
        query = "DELETE FROM Filme WHERE id = %s"
        return execute_query(query, (filme_id,), commit=True)
    
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