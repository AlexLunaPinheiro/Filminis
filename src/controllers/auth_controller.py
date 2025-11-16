from utils.http_utils import parse_json_body, send_json_response
from services.auth_service import AuthService

class AuthController:
    def __init__(self):
        self.auth_service = AuthService()

    def handle_login(self, handler):
        data = parse_json_body(handler)
        if not data or 'email' not in data or 'password' not in data:
            send_json_response(handler, 400, {'message': 'Email e senha são obrigatórios.'})
            return

        token, user_info = self.auth_service.login(data['email'], data['password'])
        
        if not token:
            send_json_response(handler, 401, {'message': user_info}) # user_info é a msg de erro
            return

        send_json_response(handler, 200, {'token': token, 'user': user_info})