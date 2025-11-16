import { useNavigate,  } from 'react-router-dom';

import styles from './Movies.module.css';
import CastCard from '../../components/CastCard';
import DirectorCard from '../../components/DirectorCard';
import MoviesSlider from '../../components/MoviesSlider';
import Topic from '../../components/Topic';
import Navbar from '../../components/NavBar';
import MovieSpecs from '../../components/MovieSpecs';
import Kubrick from '../../assets/images/StanleyKubrick.png'
import Ator from '../../assets/images/Ator.png'
import Footer from '../../components/Footer';
import ActionButton from '../../components/ActionButton';

type MovieProps = {
    movieTitle?: string,
    sinopse?: string

}


function Movies({}: MovieProps){
    const navigate = useNavigate();

     const goToAddMovie = () => {
        navigate("/solicitation");
    };
    
    return(
        <div className={styles.moviesContainer}>
            <header className={styles.moviesHeader}>
                <Navbar variant='transparent'></Navbar>
                
                <div className={styles.sombras}>
                    <div className={styles.movieInfo}>
                        <h1>2001: uma odisseia no espaço</h1>
                        <MovieSpecs ano={1982} duracaoHoras={2} duracaoMinutos={22} 
                        generos={["Ficção cientifica", "Psicodélico"]} produtora='Warner Pictures'></MovieSpecs>
                        <ActionButton 
                            text='Editar filme +' 
                            variant='create'
                            onClick={goToAddMovie}
                        />

                        
                        <div className={styles.castContainer}>
                            <h2>Elenco:</h2>
                            <div className={styles.cast}>
                                <DirectorCard imageLink={Kubrick} nome='Stanley Kubrick'/>
                                <CastCard imageLink={Ator} nome='Clovis Basilio'/>
                                <CastCard imageLink={Ator} nome='Clovis Basilio'/>
                                <CastCard imageLink={Ator} nome='Clovis Basilio'/>
                                <CastCard imageLink={Ator} nome='Clovis Basilio'/>
                            </div>
                            

                        </div>
                    </div>

                    
                </div>
                
            </header>

            <main className={styles.movieMain}>
                <section className={styles.sinopse}>
                    <Topic text='Sinopse:'/>
                    <p className={styles.sinopseText}>Em uma coisa coisada como por exemplo o espaço, Douglas adams encontra uma nave 
alienigena e monta um cubo magico magico que se desmonta toda vez que alguem chora
uma pena que margaret, a esposa de Douglas, tem transtorno de borderline, tornando a 
experiência da viagem uma loucura dos infernos.</p>
                </section>
                <section className={styles.relatedMovies}>
                    <Topic text='Você também vai gostar:'/>
                    <MoviesSlider></MoviesSlider>
                </section>
            </main>

            <Footer variant='max'/>
        </div>
    )
};

export default Movies;