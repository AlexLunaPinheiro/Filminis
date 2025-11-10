import { useRef } from 'react';
import styles from './MoviesSlider.module.css';
import { mockAcclaimedMovies } from '../../services/data/acclaimedMovies';
import MovieCard from '../MovieCard';

// Ícones de seta (use seus próprios <img> ou SVGs aqui)
const ArrowLeft = () => <span>&lt;</span>;
const ArrowRight = () => <span>&gt;</span>;

function MoviesSlider() {
    // Usamos 'useRef' para pegar o container que vai "scrollar"
    const trackRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;

        // Calcula o quanto rolar (a largura visível do container)
        const scrollAmount = trackRef.current.clientWidth;

        if (direction === 'left') {
            trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        // O container principal segura os botões
        <div className={styles.sliderContainer}>
            <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => handleScroll('left')}
            >
                <ArrowLeft />
            </button>
            
            {/* O 'viewport' é o container que esconde e rola os cards */}
            <div className={styles.viewport} ref={trackRef}>
                {mockAcclaimedMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        imageLink={movie.imageLink}
                        title={movie.title}
                        produtora={movie.produtora}
                        ano={movie.ano}
                    />
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