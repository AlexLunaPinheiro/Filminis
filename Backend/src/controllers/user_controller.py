from utils.http_utils import parse_json_body, send_json_response, get_auth_user

class UsuarioController:
    def __init__(self, service):
        self.usuario_service = service

    def handle_get_solicitacoes(self, handler, user_data):
        user_id = user_data['user_id']
        solicitacoes = self.usuario_service.get_minhas_solicitacoes(user_id)
        send_json_response(handler, 200, solicitacoes)

    def handle_create_solicitacao(self, handler, user_data):
        user_id = user_data['user_id']
        data = parse_json_body(handler)
        
        if not data or 'tipo' not in data or 'payload' not in data:
            send_json_response(handler, 400, {'message': 'Dados de solicitação inválidos.'})
            return
            
        success, message = self.usuario_service.criar_solicitacao(user_id, data)
        if not success:
            send_json_response(handler, 500, {'message': message})
            return
            
        send_json_response(handler, 201, {'message': 'Solicitação enviada com sucesso!'})

    def handle_get_my_info(self, handler, user_data):
        user_id = user_data['user_id']
        user_info = self.usuario_service.get_user_info(user_id)
        if not user_info:
            send_json_response(handler, 404, {'message': 'Usuário não encontrado.'})
            return
        send_json_response(handler, 200, user_info)