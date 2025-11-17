from utils.http_utils import parse_json_body, send_json_response
from services.auth_service import AuthService

class AuthController:
    
    # CORREÇÃO: Mude o __init__ para aceitar o serviço
    def __init__(self, service):
        self.auth_service = service # <-- Recebe o serviço

    def handle_login(self, handler):
        data = parse_json_body(handler)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            send_json_response(handler, 400, {'message': 'Email e senha são obrigatórios.'})
            return

        result = self.auth_service.login(email, password)
        if not result:
            send_json_response(handler, 401, {'message': 'Credenciais inválidas.'})
            return
            
        # Esta linha agora enviará o JSON { "token": ..., "user": ... }
        send_json_response(handler, 200, result)