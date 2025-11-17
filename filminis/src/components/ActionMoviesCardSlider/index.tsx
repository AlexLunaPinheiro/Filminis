import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './ActionMoviesCardSlider.module.css'
import ActionMovieCard from '../ActionMoviesCard';

import { searchFilmes } from '../../services/interceptors/movie_interceptor';
import type { FilmeListado } from '../../services/interceptors/movie_interceptor';
import { Link } from 'react-router-dom';


const ArrowLeft = () => <span>&lt;</span>;
const ArrowRight = () => <span>&gt;</span>;

const TRANSITION_DURATION = 500; 

function ActionMoviesSlider() {
    const [actionMovies, setActionMovies] = useState<FilmeListado[]>([]);
    
    useEffect(() => {
        async function loadActionMovies() {
            try {
                const data = await searchFilmes({ genero: 'Ação' });
                setActionMovies(data.slice(0, 5)); 
            } catch (error) {
                console.error("Erro ao buscar filmes de ação:", error);
            }
        }
        loadActionMovies();
    }, []);
    
    const clonedMovies = useMemo(() => {
        if (actionMovies.length === 0) return [];
        const firstItem = actionMovies[0];
        const lastItem = actionMovies[actionMovies.length - 1];
        return [lastItem, ...actionMovies, firstItem];
    }, [actionMovies]);

    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false); 
    const sliderTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (clonedMovies.length === 0) return;
        const track = sliderTrackRef.current;

        if (!track) return;
        const currentCard = track.children[currentIndex] as HTMLElement;

        if (!currentCard) return;
        const viewportCenter = track.parentElement!.offsetWidth / 2;
        const cardCenter = currentCard.offsetLeft + currentCard.offsetWidth / 2;
        const offset = viewportCenter - cardCenter;
        track.style.transform = `translateX(${offset}px)`;
    }, [currentIndex, clonedMovies]);

    const handlePrev = () => {
        if (isTransitioning || clonedMovies.length === 0) return; 
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        if (isTransitioning || clonedMovies.length === 0) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        if (clonedMovies.length === 0) return;
        const track = sliderTrackRef.current;
        if (!track) return;

        let newIndex = currentIndex;
        let needsJump = false;

        if (currentIndex === clonedMovies.length - 1) {
            newIndex = 1; 
            needsJump = true;
        } 
        else if (currentIndex === 0) {
            newIndex = clonedMovies.length - 2; 
            needsJump = true;
        }

        if (needsJump) {
            track.style.transition = 'none';
            setCurrentIndex(newIndex);
            
            track.offsetHeight; 
            track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)`;
        }

        setIsTransitioning(false);
    };

    if (actionMovies.length === 0) {
        return <div className={styles.sliderContainer}><p>Carregando filmes de ação...</p></div>
    }

    return (
        <div className={styles.sliderContainer}>
            <button 
                className={`${styles.navButton} ${styles.prevButton}`} 
                onClick={handlePrev}
            >
                <ArrowLeft />
            </button>

            <div className={styles.sliderViewport}>
                <div 
                    className={styles.sliderTrack} 
                    ref={sliderTrackRef}
                    onTransitionEnd={handleTransitionEnd} 
                >
                    {clonedMovies.map((movie, index) => (
                        <Link to={`/movies/${movie.id}`} key={`${movie.id}-${index}`}>
                            <ActionMovieCard
                                imageLink={movie.url_poster}
                                titulo={movie.titulo}
                                duracao={String(movie.tempo_duracao)}
                                variant={index === currentIndex ? 'grande' : 'pequeno'}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <button 
                className={`${styles.navButton} ${styles.nextButton}`} 
                onClick={handleNext}
            >
                <ArrowRight />
            </button>
        </div>
    );
}

export default ActionMoviesSlider;