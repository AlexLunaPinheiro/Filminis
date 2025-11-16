from config.db import execute_query

class UsuarioRepository:
    def find_by_email(self, email):
        query = "SELECT * FROM Usuario WHERE email = %s"
        return execute_query(query, (email,), fetchone=True)