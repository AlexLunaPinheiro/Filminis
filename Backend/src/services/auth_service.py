from repositories.user_repository import UsuarioRepository
from utils.auth_utils import check_password, create_jwt

class AuthService:
    def __init__(self):
        self.user_repo = UsuarioRepository()

    def login(self, email, password):
        user = self.user_repo.find_by_email(email)
        
        if not user:
            return None 
        
        if not check_password(password, user['password_hash']):
            return None 

        token = create_jwt(user['id'], user['role'])
        
        user_info = {
            "id": user['id'],
            "nome": user['nome'],
            "role": user['role']
        }
        #Retorna o token + informações do usuário
        return {
            "token": token,
            "user": user_info
        }