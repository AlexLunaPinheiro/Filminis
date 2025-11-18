from utils.http_utils import send_json_response
from services.movie_service import FilmeService 
from urllib.parse import urlparse # Importar para ler a query

class FilmeController:

    def __init__(self, service):
        self.filme_service = service 

    def handle_get_all(self, handler):
        # Passa o handler para o service poder ler os filtros
        filmes = self.filme_service.get_all_filmes(handler) 
        send_json_response(handler, 200, filmes)

    def handle_get_by_id(self, handler, filme_id):
        filme = self.filme_service.get_filme_details(filme_id)
        if not filme:
            send_json_response(handler, 404, {'message': 'Filme não encontrado.'})
            return
        send_json_response(handler, 200, filme)

    # Funções de catálogo
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