from utils.http_utils import parse_json_body, send_json_response

class AdminController:
    def __init__(self, service):
        self.admin_service = service

    def handle_get_relatorio(self, handler):
        stats = self.admin_service.get_relatorio_dashboard()
        send_json_response(handler, 200, stats)

    def handle_get_solicitacoes(self, handler):
        solicitacoes = self.admin_service.get_solicitacoes_abertas()
        send_json_response(handler, 200, solicitacoes)

    def handle_get_solicitacao_by_id(self, handler, solic_id):
        solicitacao = self.admin_service.get_detalhes_solicitacao(solic_id)
        if not solicitacao:
            send_json_response(handler, 404, {'message': 'Solicitação não encontrada.'})
            return
        send_json_response(handler, 200, solicitacao)

    def handle_review_solicitacao(self, handler, solic_id):
        data = parse_json_body(handler)
        acao = data.get('acao') # 'APROVAR' ou 'REJEITAR'
        
        if acao == 'APROVAR':
            success, msg = self.admin_service.aprovar_solicitacao(solic_id)
        elif acao == 'REJEITAR':
            success = self.admin_service.desaprovar_solicitacao(solic_id)
            msg = "Solicitação rejeitada."
        else:
            send_json_response(handler, 400, {'message': 'Ação inválida.'})
            return

        if not success:
            send_json_response(handler, 500, {'message': msg})
            return
        send_json_response(handler, 200, {'message': msg})

    def handle_admin_create_filme(self, handler):
        payload = parse_json_body(handler)
        if not payload:
            send_json_response(handler, 400, {'message': 'Payload inválido.'})
            return
        success, msg = self.admin_service.admin_criar_filme(payload)
        if not success:
            send_json_response(handler, 500, {'message': msg})
            return
        send_json_response(handler, 201, {'message': msg})

    def handle_admin_edit_filme(self, handler, filme_id):
        payload = parse_json_body(handler)
        if not payload:
            send_json_response(handler, 400, {'message': 'Payload inválido.'})
            return
        success, msg = self.admin_service.admin_editar_filme(filme_id, payload)
        if not success:
            send_json_response(handler, 500, {'message': msg})
            return
        send_json_response(handler, 200, {'message': msg})

    def handle_admin_delete_filme(self, handler, filme_id):
        success = self.admin_service.admin_deletar_filme(filme_id)
        if not success:
            send_json_response(handler, 500, {'message': 'Erro ao deletar filme.'})
            return
        send_json_response(handler, 200, {'message': 'Filme deletado com sucesso.'})