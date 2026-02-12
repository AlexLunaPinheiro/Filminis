import { useRef, useState, useEffect } from 'react';
import styles from './MoviesSlider.module.css';
import MovieCard from '../MovieCard';
import { Link } from 'react-router-dom';

import { getAllFilmes } from '../../services/interceptors/movie_interceptor';
import type { FilmeListado } from '../../services/interceptors/movie_interceptor';

const ArrowLeft = () => <span>&lt;</span>;
const ArrowRight = () => <span>&gt;</span>;

function MoviesSlider() {
    const trackRef = useRef<HTMLDivElement>(null);
    // Estados para os filmes
    const [filmes, setFilmes] = useState<FilmeListado[]>([]);
    const [loading, setLoading] = useState(true);

    // Buscar os filmes
    useEffect(() => {
        async function loadFilmes() {
            try {
                const data = await getAllFilmes();
                setFilmes(data.sort(() => 0.5 - Math.random()).slice(0, 10)); // Pega 10 aleatórios
            } catch (error) {
                console.error("Erro ao buscar filmes para o slider:", error);
            } finally {
                setLoading(false);
            }
        }
        loadFilmes();
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;
        
        const scrollAmount = trackRef.current.clientWidth;

        if (direction === 'left') {
            trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    if (loading) {
        return <div className={styles.sliderContainer}><p>Carregando filmes...</p></div>
    }

    return (
        <div className={styles.sliderContainer}>
            <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => handleScroll('left')}
            >
                <ArrowLeft />
            </button>
            
            <div className={styles.viewport} ref={trackRef}>

                {filmes.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id}> 
                        <MovieCard
                            imageLink={movie.url_poster}
                            title={movie.titulo}
                            produtora={movie.produtoras || "produtora não informada"} 
                            ano={String(movie.ano_lancamento)}
                        />
                    </Link>
                ))}
            </div>

            <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={() => handleScroll('right')}
            >
                <ArrowRight />
            </button>
        </div>
    );
}

export default MoviesSlider;