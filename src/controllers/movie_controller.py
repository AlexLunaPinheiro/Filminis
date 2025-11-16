from utils.http_utils import send_json_response
from services.movie_service import FilmeService
from urllib.parse import urlparse, parse_qs

class FilmeController:
    def __init__(self):
        self.filme_service = FilmeService()

    def handle_get_all(self, handler):
        parsed_path = urlparse(handler.path)
        query_params = parse_qs(parsed_path.query)
        
        if query_params:
            # É uma busca/filtro
            filmes = self.filme_service.filtrar_filmes(query_params)
        else:
            # É listagem normal
            filmes = self.filme_service.get_todos_filmes()
            
        send_json_response(handler, 200, filmes)

    def handle_get_by_id(self, handler, filme_id):
        filme = self.filme_service.get_detalhes_filme(filme_id)
        if not filme:
            send_json_response(handler, 404, {'message': 'Filme não encontrado.'})
            return
        send_json_response(handler, 200, filme)

        def handle_get_generos(self, handler):
            generos = self.filme_service.get_generos()
            send_json_response(handler, 200, generos)
        
    def handle_get_atores(self, handler):
        atores = self.filme_service.get_atores()
        send_json_response(handler, 200, atores)

    def handle_get_diretores(self, handler):
        diretores = self.filme_service.get_diretores()
        send_json_response(handler, 200, diretores)

    def handle_get_nacionalidades(self, handler):
        nacionalidades = self.filme_service.get_nacionalidades()
        send_json_response(handler, 200, nacionalidades)