import { useState, useEffect } from 'react';
import NavigationId from "../../components/NavigationId";
import HomeCarrossel from '../../components/HomeCarrossel'; 
import styles from './Home.module.css'; 
import Navbar from '../../components/NavBar';
import CategorySlider from '../../components/CategorySlider';
import Topic from '../../components/Topic';
import ActionMoviesSlider from '../../components/ActionMoviesCardSlider';
import MoviesSlider from '../../components/MoviesSlider';
import Footer from '../../components/Footer';
import ButtonHome from '../../components/ButtonHome';

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth_context';


import Magu from '../../assets/icons/Logo.png'; 


import { getAllFilmes } from '../../services/interceptors/movie_interceptor'; 
import type { FilmeListado } from '../../services/interceptors/movie_interceptor'; 


const TEMPO_DE_SLIDE = 5000; 

function Home(){
  const [filmes, setFilmes] = useState<FilmeListado[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function loadFilmes() {
      try {
        const data = await getAllFilmes();
        setFilmes(data.filter(f => f.url_capa).slice(0, 4)); 
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFilmes();
  }, []); 

  useEffect(() => {
    if (filmes.length === 0) return; 

    const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filmes.length);
    }, TEMPO_DE_SLIDE);

    return () => clearInterval(timer);
  }, [filmes, filmes.length]);

  if (loading) {
    return (
      <div className={styles.homeContainer}>
        <header className={styles.headerHome}>
          <Navbar variant='solid'/>
          <div style={{height: '508px', marginTop: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p>Carregando filmes...</p>
          </div>
        </header>
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className={styles.homeContainer}>
        <header className={styles.headerHome}>
          <Navbar variant='solid'/>
          <div>
            <p>Nenhum filme encontrado no catálogo.</p>
          </div>
        </header>
      </div>
    );   
  }

  const filmeAtual = filmes[currentIndex];

  return(
    <div className={styles.homeContainer}>
        <header className={styles.headerHome}>
             <Navbar variant='solid'/>
        
            <HomeCarrossel 
                key={filmeAtual.id}
                filmeId={filmeAtual.id}
                imageLink={filmeAtual.url_capa}
                titulo={filmeAtual.titulo}
                ano={String(filmeAtual.ano_lancamento)}
                genero={"Filme"} 
            />
      
            <NavigationId 
                totalItems={filmes.length}
                currentIndex={currentIndex}
            />
        </header>
        
        <main className={styles.homeMain}>
            <CategorySlider/>
            <div className={styles.topicContainer}>
                <Topic text='O melhor da Ação'/>
            </div>
            
            <ActionMoviesSlider/> 

            <div className={styles.topicContainer}>
                <Topic text='Aclamados pela crítica'/>
            </div>
            
            <MoviesSlider/> 

            <div className={styles.topicContainer}>
                <Topic text='Em destaque'/>
            </div>

            <MoviesSlider/>

            {isLoggedIn ? (
                <section className={styles.ctaBannerLoggedIn}>
                    <div className={styles.ctaContent}>
                        <h1>Compartilhe suas histórias.</h1>
                        
                        <Link to="/solicitation" >
                            <ButtonHome text='Cadastrar novo filme'></ButtonHome>
                        </Link>
                        <p>Faça o Registro de um novo filme na MaguFlix para expandir nossas histórias!</p>
                    </div>
                    <img src={Magu} alt="MaguFlix Logo" className={styles.ctaImage} />

                </section>
            ) : (

                <section className={styles.ctaBannerLoggedOut}>
                    <div className={styles.ctaContent}>
                        <div className={styles.title}>
                            <h1>Navegue pela sua imaginação.</h1>
                            <img src={Magu} alt="MaguFlix Logo" className={styles.ctaImage} />
                        </div>

                        <Link to="/login">
                            <ButtonHome text='Login'></ButtonHome>
                        </Link>
                        <p>Faça seu registro ou login na MaguFlix para descobrir novos filmes e aventuras.</p>
                    </div>
                    
                </section>
            )}
        </main>

        <Footer variant='max'/>
        
    </div>
  )
};

export default Home;