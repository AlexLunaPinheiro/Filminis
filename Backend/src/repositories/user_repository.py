from config.db import execute_query

class UsuarioRepository:
    def find_by_email(self, email):
        query = "SELECT * FROM Usuario WHERE email = %s"
        return execute_query(query, (email,), fetchone=True)
    
    def find_by_id(self, user_id):
        query = "SELECT id, nome, sobrenome, email, role FROM Usuario WHERE id = %s"
        return execute_query(query, (user_id,), fetchone=True)