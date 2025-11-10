export type AcclaimedMovie = {
    id: string;
    imageLink: string;
    title: string;
    produtora: string;
    ano: string;
};

// **IMPORTANTE**: Substitua 'URL_...' pelas URLs das suas imagens
export const mockAcclaimedMovies: AcclaimedMovie[] = [
    {
        id: "1",
        imageLink: "https://i.pinimg.com/1200x/1d/26/f4/1d26f4781205e1964abdf3cc376f3286.jpg",
        title: "Brilho Eterno...",
        produtora: "Warner Bros",
        ano: "2001"
    },
    {
        id: "2",
        imageLink: "https://i.pinimg.com/736x/13/77/52/13775209ba3f2db14db4488b3cd018ef.jpg",
        title: "Sociedade dos Poetas Mortos",
        produtora: "Shudder",
        ano: "1989"
    },
    {
        id: "3",
        imageLink: "https://i.pinimg.com/736x/6c/6d/71/6c6d7177c225ee424b8c3bea8073f0de.jpg",
        title: "2001: Uma Odisseia...",
        produtora: "A24",
        ano: "1982"
    },
    {
        id: "4",
        imageLink: "https://i.pinimg.com/1200x/89/41/e7/8941e71464be8fe81ade92a86817338e.jpg",
        title: "Pulp Fiction",
        produtora: "Warner Bros",
        ano: "2002"
    },
    {
        id: "5",
        imageLink: "https://i.pinimg.com/1200x/53/61/d6/5361d60ee16bdbe0b81df194d8c58987.jpg",
        title: "Requiem para um Sonho",
        produtora: "Warner Bros",
        ano: "2001"
    },
    {
        id: "6",
        imageLink: "https://i.pinimg.com/1200x/71/af/82/71af8247cf9f1b13485db67d01135250.jpg",
        title: "Monty Python",
        produtora: "Disney",
        ano: "1987"
    },
    // Adicione mais se quiser (ex: mais 6 para a "próxima página")
    {
        id: "7",
        imageLink: "https://i.pinimg.com/1200x/ac/45/4e/ac454eb9fd61dae9dfd6c920de211021.jpg",
        title: "Brilho Eterno...",
        produtora: "Warner Bros",
        ano: "2001"
    },
];