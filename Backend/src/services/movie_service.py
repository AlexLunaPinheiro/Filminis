from repositories.movie_repository import FilmeRepository
from urllib.parse import urlparse, parse_qs

class FilmeService:
    def __init__(self):
        self.filme_repo = FilmeRepository()

    def get_all_filmes(self, handler):
        query_string = urlparse(handler.path).query
        if not query_string:
            return self.filme_repo.get_all() # Chama get_all se não houver filtros
            
        params = parse_qs(query_string)
        return self.filme_repo.filter_filmes(params) # Chama filter_filmes se houver filtros

    def get_filme_details(self, filme_id):
        return self.filme_repo.get_details_by_id(filme_id)

    def get_generos(self):
        return self.filme_repo.get_all_generos()

    def get_atores(self):
        return self.filme_repo.get_all_atores()

    def get_diretores(self):
        return self.filme_repo.get_all_diretores()

    def get_nacionalidades(self):
        return self.filme_repo.get_all_nacionalidades()