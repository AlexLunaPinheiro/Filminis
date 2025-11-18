from repositories.user_repository import UsuarioRepository
from utils.auth_utils import check_password, create_jwt

class AuthService:
    def __init__(self):
        self.user_repo = UsuarioRepository()

    def login(self, email, password):
        user = self.user_repo.find_by_email(email)
        
        if not user:
            # Não retorne tupla aqui, o controller espera um único valor
            return None 
        
        if not check_password(password, user['password_hash']):
            # Não retorne tupla aqui
            return None 

        token = create_jwt(user['id'], user['role'])
        
        user_info = {
            "id": user['id'],
            "nome": user['nome'],
            "role": user['role']
        }

        # CORREÇÃO AQUI: Retorne um dicionário (Objeto)
        return {
            "token": token,
            "user": user_info
        }