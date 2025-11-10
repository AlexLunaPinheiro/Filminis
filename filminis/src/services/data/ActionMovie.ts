export type ActionMovie = {
  id: string;
  imageLink: string;
  titulo: string;
  duracao: string;
};

export const mockActionMovies: ActionMovie[] = [
  {
    id: "1",
    titulo: "Django Livre",
    duracao: "02:04:03",
    imageLink: "https://i.pinimg.com/736x/82/a2/eb/82a2eba5f16090aa711079ea57de47f5.jpg"
  },
  {
    id: "2",
    titulo: "Onde os fracos não tem vez",
    duracao: "02:30:03",
    imageLink: "https://i.pinimg.com/1200x/99/56/9f/99569fcfdd76ad5f141eac0dc363bb25.jpg"
  },
  {
    id: "3",
    titulo: "Fury",
    duracao: "01:45:34",
    imageLink: "https://i.pinimg.com/736x/f8/c8/cd/f8c8cd6c7a3c8a9d9862eca735a257d1.jpg"
  },
  {
    id: "4",
    titulo: "Duro de matar",
    duracao: "02:00:00",
    imageLink: "https://i.pinimg.com/1200x/e4/17/6e/e4176edc84f97e9901bf15c02fc8c084.jpg"
  },
  {
    id: "5",
    titulo: "Mais Um Filme",
    duracao: "01:30:00",
    imageLink: "URL_DA_IMAGEM_5"
  },
];