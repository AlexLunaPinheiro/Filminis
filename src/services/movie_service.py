from repositories.movie_repository import FilmeRepository

class FilmeService:
    def __init__(self):
        self.filme_repo = FilmeRepository()

    def get_todos_filmes(self):
        return self.filme_repo.get_all()

    def get_detalhes_filme(self, filme_id):
        return self.filme_repo.get_details_by_id(filme_id)
        
    def filtrar_filmes(self, filtros):
        return self.filme_repo.filter_filmes(filtros)
    
    def get_generos(self):
        return self.filme_repo.get_all_generos()

    def get_atores(self):
        return self.filme_repo.get_all_atores()

    def get_diretores(self):
        return self.filme_repo.get_all_diretores()

    def get_nacionalidades(self):
        return self.filme_repo.get_all_nacionalidades()