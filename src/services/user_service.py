import json
from repositories.solicitation_repository import SolicitacaoRepository

class UsuarioService:
    def __init__(self):
        self.solic_repo = SolicitacaoRepository()

    def criar_solicitacao(self, usuario_id, dados):
        tipo = dados.get('tipo') # 'ADICAO' ou 'EDICAO'
        payload = dados.get('payload')
        filme_id_alvo = None
        
        if tipo == 'EDICAO':
            filme_id_alvo = payload.get('filme_id')
            if not filme_id_alvo:
                return False, "ID do filme é obrigatório para edição."

        # Converte o dict de dados em uma string JSON para o DB
        payload_json = json.dumps(payload) 
        
        success = self.solic_repo.create(usuario_id, tipo, payload_json, filme_id_alvo)
        return success, "Solicitação criada."

    def get_minhas_solicitacoes(self, usuario_id):
        return self.solic_repo.get_by_usuario_id(usuario_id)