import { useState, useRef, useEffect, useMemo } from 'react'; // Importe useMemo
import styles from './ActionMoviesCardSlider.module.css'
import ActionMovieCard from '../ActionMoviesCard';
import { mockActionMovies } from '../../services/data/ActionMovie';


const ArrowLeft = () => <span>&lt;</span>;
const ArrowRight = () => <span>&gt;</span>;

const TRANSITION_DURATION = 500; 

function ActionMoviesSlider() {
    const clonedMovies = useMemo(() => {
        if (mockActionMovies.length === 0) return [];
        
        const firstItem = mockActionMovies[0];
        const lastItem = mockActionMovies[mockActionMovies.length - 1];
        
        return [lastItem, ...mockActionMovies, firstItem];
    }, [mockActionMovies]);

    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false); 
    const sliderTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        if (isTransitioning) return; 
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
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
                        <ActionMovieCard
                            key={`${movie.id}-${index}`} 
                            imageLink={movie.imageLink}
                            titulo={movie.titulo}
                            duracao={movie.duracao}
                            variant={index === currentIndex ? 'grande' : 'pequeno'}
                        />
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