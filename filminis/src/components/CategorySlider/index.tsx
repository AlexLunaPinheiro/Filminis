import { useRef, useState } from 'react';
import styles from './CategorySlider.module.css';
import MovieCategory from '../MovieCategory';
import { categories } from '../../services/data/MovieCategories';

function CategorySlider() {
    const sliderRef = useRef<HTMLDivElement>(null); 
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDown(true);
        sliderRef.current.classList.add(styles.active);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        if (!sliderRef.current) return;
        setIsDown(false);
        sliderRef.current.classList.remove(styles.active);
    };

    const handleMouseUp = () => {
        if (!sliderRef.current) return;
        setIsDown(false);
        sliderRef.current.classList.remove(styles.active);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            className={styles.sliderViewport}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.sliderContainer}>
                {categories.map((category) => (
                    <MovieCategory
                        key={category.title}
                        title={category.title}
                        imageLink={category.imageLink}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategorySlider;