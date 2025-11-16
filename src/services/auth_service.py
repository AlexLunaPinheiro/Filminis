from repositories.user_repository import UsuarioRepository
from utils.auth_utils import check_password, create_jwt

class AuthService:
    def __init__(self):
        self.user_repo = UsuarioRepository()

    def login(self, email, password):
        user = self.user_repo.find_by_email(email)
        
        if not user:
            return None, "Usuário não encontrado."
        
        # (user['password_hash'] vem como string, não bytes)
        if not check_password(password, user['password_hash']):
            return None, "Senha incorreta."

        token = create_jwt(user['id'], user['role'])
        
        user_info = {
            "id": user['id'],
            "nome": user['nome'],
            "role": user['role']
        }

        return token, user_info