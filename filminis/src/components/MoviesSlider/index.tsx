import { useRef } from 'react';
import styles from './MoviesSlider.module.css';
import { mockAcclaimedMovies } from '../../services/data/acclaimedMovies';
import MovieCard from '../MovieCard';

const ArrowLeft = () => <span>&lt;</span>;
const ArrowRight = () => <span>&gt;</span>;

function MoviesSlider() {
    const trackRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;
        
        const scrollAmount = trackRef.current.clientWidth;

        if (direction === 'left') {
            trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.sliderContainer}>
            <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => handleScroll('left')}
            >
                <ArrowLeft />
            </button>
            
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