import re
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from utils.http_utils import send_json_response, handle_cors_options, get_auth_user

# Importar serviços
from services.auth_service import AuthService
from services.movie_service import FilmeService
from services.user_service import UsuarioService
from services.admin_service import AdminService

# Importar controllers
from controllers.auth_controller import AuthController
from controllers.movie_controller import FilmeController
from controllers.user_controller import UsuarioController
from controllers.admin_controller import AdminController

# Instanciar serviços
auth_service = AuthService()
filme_service = FilmeService()
usuario_service = UsuarioService()
admin_service = AdminService()

# Instanciar controllers com seus serviços
auth_controller = AuthController()
filme_controller = FilmeController()
usuario_controller = UsuarioController(usuario_service)
admin_controller = AdminController(admin_service)

# --- Definição de Rotas (Regex) ---
RE_FILME_ID = re.compile(r'^/filmes/(\d+)$')
RE_ADMIN_SOLICITACAO_ID = re.compile(r'^/admin/solicitacoes/(\d+)$')
RE_ADMIN_REVIEW_ID = re.compile(r'^/admin/solicitacoes/(\d+)/review$')
RE_ADMIN_FILME_ID = re.compile(r'^/admin/filmes/(\d+)$')


class FilminisHTTPHandler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        handle_cors_options(self)

    def do_GET(self):
        path = urlparse(self.path).path

        # --- Rotas Públicas ---
        if path == '/filmes':
            filme_controller.handle_get_all(self)
            return
        
        if path == '/generos':
            filme_controller.handle_get_generos(self)
            return

        if path == '/atores':
            filme_controller.handle_get_atores(self)
            return
            
        if path == '/diretores':
            filme_controller.handle_get_diretores(self)
            return

        if path == '/nacionalidades':
            filme_controller.handle_get_nacionalidades(self)
            return
            
        filme_match = RE_FILME_ID.match(path)
        if filme_match:
            filme_id = int(filme_match.group(1))
            filme_controller.handle_get_by_id(self, filme_id)
            return

        # --- Rotas de Usuário Comum ---
        if path == '/solicitacoes':
            user_data = get_auth_user(self)
            if not user_data:
                send_json_response(self, 401, {'message': 'Token de autenticação inválido ou ausente.'})
                return
            usuario_controller.handle_get_solicitacoes(self, user_data)
            return

        # --- Rotas de Admin ---
        user_data = get_auth_user(self)
        if not user_data or user_data['role'] != 'ADMIN':
            # Se a rota não for pública e o usuário não for admin, negar
            if path.startswith('/admin/'):
                send_json_response(self, 403, {'message': 'Acesso restrito a administradores.'})
                return
        
        else: # O usuário é ADMIN
            if path == '/admin/relatorio':
                admin_controller.handle_get_relatorio(self)
                return
            
            if path == '/admin/solicitacoes':
                admin_controller.handle_get_solicitacoes(self)
                return
            
            admin_solic_match = RE_ADMIN_SOLICITACAO_ID.match(path)
            if admin_solic_match:
                solic_id = int(admin_solic_match.group(1))
                admin_controller.handle_get_solicitacao_by_id(self, solic_id)
                return

        # Se nenhuma rota bateu
        send_json_response(self, 404, {'message': 'Endpoint não encontrado.'})

    def do_POST(self):
        path = urlparse(self.path).path

        if path == '/login':
            auth_controller.handle_login(self)
            return

        # --- Rotas Autenticadas ---
        user_data = get_auth_user(self)
        if not user_data:
            send_json_response(self, 401, {'message': 'Token de autenticação inválido ou ausente.'})
            return

        if path == '/solicitacoes':
            usuario_controller.handle_create_solicitacao(self, user_data)
            return

        # --- Rotas de Admin ---
        if user_data['role'] != 'ADMIN':
            if path.startswith('/admin/'):
                send_json_response(self, 403, {'message': 'Acesso restrito a administradores.'})
                return
        
        else: # O usuário é ADMIN
            admin_review_match = RE_ADMIN_REVIEW_ID.match(path)
            if admin_review_match:
                solic_id = int(admin_review_match.group(1))
                admin_controller.handle_review_solicitacao(self, solic_id)
                return

            if path == '/admin/filmes':
                admin_controller.handle_admin_create_filme(self)
                return
        
        send_json_response(self, 404, {'message': 'Endpoint não encontrado.'})

    def do_PUT(self):
        path = urlparse(self.path).path
        
        user_data = get_auth_user(self)
        if not user_data or user_data['role'] != 'ADMIN':
            send_json_response(self, 403, {'message': 'Acesso restrito a administradores.'})
            return

        # Admin: Edição direta de filme
        admin_filme_match = RE_ADMIN_FILME_ID.match(path)
        if admin_filme_match:
            filme_id = int(admin_filme_match.group(1))
            admin_controller.handle_admin_edit_filme(self, filme_id)
            return
            
        send_json_response(self, 404, {'message': 'Endpoint não encontrado.'})

    def do_DELETE(self):
        path = urlparse(self.path).path

        user_data = get_auth_user(self)
        if not user_data or user_data['role'] != 'ADMIN':
            send_json_response(self, 403, {'message': 'Acesso restrito a administradores.'})
            return

        # Admin: Deleção direta de filme
        admin_filme_match = RE_ADMIN_FILME_ID.match(path)
        if admin_filme_match:
            filme_id = int(admin_filme_match.group(1))
            admin_controller.handle_admin_delete_filme(self, filme_id)
            return

        send_json_response(self, 404, {'message': 'Endpoint não encontrado.'})