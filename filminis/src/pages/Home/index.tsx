import { useState, useEffect } from 'react';
import NavigationId from "../../components/NavigationId";
import HomeCarrossel from '../../components/HomeCarrossel'; 
import styles from './Home.module.css'; 
import Navbar from '../../components/NavBar';
import CategorySlider from '../../components/CategorySlider';
import Topic from '../../components/Topic';
import ActionMoviesSlider from '../../components/ActionMoviesCardSlider';
import MoviesSlider from '../../components/MoviesSlider';

type Filme = {
    id: number;
    titulo: string;
    ano: string;
    genero: string;
    imageLink: string;
};

const mockFilmes: Filme[] = [
    {
        id: 1,
        titulo: "A Origem",
        ano: "2010",
        genero: "Ficção Científica",
        imageLink: "https://ovicio.com.br/wp-content/uploads/2020/08/20200802-filme-a-origem.jpg" 
    },
    {
        id: 2,
        titulo: "O Poderoso Chefão",
        ano: "1972",
        genero: "Drama",
        imageLink: "https://s2-oglobo.glbimg.com/K6Ib9lWtn49SUOLEz11SdDVIuu0=/0x0:1200x675/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/N/y/ScyTWUQdyaRivNlc1WYQ/poderoso.jpg" 
    },
    {
        id: 3,
        titulo: "Batman: O Cavaleiro das Trevas",
        ano: "2008",
        genero: "Ação",
        imageLink: "https://i.pinimg.com/1200x/d1/a5/bf/d1a5bf094a379e426e55d5a8802041ea.jpg" 
    },
    {
        id: 4,
        titulo: "Pulp Fiction",
        ano: "1994",
        genero: "Crime",
        imageLink: "https://i.pinimg.com/1200x/e6/96/52/e69652706b0b5f2193f5e6048f365c91.jpg" 
    }
];


const TEMPO_DE_SLIDE = 5000; 

function Home(){
  
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % mockFilmes.length);
        }, TEMPO_DE_SLIDE);

      
        return () => clearInterval(timer);

    }, []); 

 
    const filmeAtual = mockFilmes[currentIndex];

    return(
        
        <div className={styles.homeContainer}>
            <Navbar/>
            
            <HomeCarrossel 
                key={filmeAtual.id}
                imageLink={filmeAtual.imageLink}
                titulo={filmeAtual.titulo}
                ano={filmeAtual.ano}
                genero={filmeAtual.genero}
            />

          
            <NavigationId 
                totalItems={mockFilmes.length}
                currentIndex={currentIndex}
            />

            <CategorySlider/>
            <div className={styles.topicContainer}>
                <Topic text='O melhor da Ação'/>
            </div>
            
            <ActionMoviesSlider/>

            <div className={styles.topicContainer}>
                <Topic text='Aclamados pela crítica'/>
            </div>
            
            <MoviesSlider/>

        </div>
    )
};

export default Home;