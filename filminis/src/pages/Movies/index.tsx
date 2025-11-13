import styles from './Movies.module.css';
import CastCard from '../../components/CastCard';
import DirectorCard from '../../components/DirectorCard';
import MoviesSlider from '../../components/MoviesSlider';
import Topic from '../../components/Topic';
import Navbar from '../../components/NavBar';
import MovieSpecs from '../../components/MovieSpecs';

type MovieProps = {
    movieTitle?: string,

}

function Movies({}: MovieProps){
    return(
        <div className={styles.moviesContainer}>
            <header className={styles.moviesHeader}>
                <Navbar variant='transparent'></Navbar>
                <div className={styles.movieInfo}>
                    <h1>2001: uma odisseia no espaço</h1>
                    <MovieSpecs ano={1982} duracaoHoras={2} duracaoMinutos={22} 
                    generos={["Ficção cientifica", "Psicodélico"]} produtora='Warner Pictures'></MovieSpecs>
                </div>
            </header>

            <main></main>
        </div>
    )
};

export default Movies;