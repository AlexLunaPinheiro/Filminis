import styles from './MovieBanner.module.css';
import { Link } from 'react-router-dom'; 

type MovieBannerProps = {
    imageLink: string,
    filmeId: number, 
}

function MovieBanner({imageLink, filmeId}: MovieBannerProps){
    return(
        <Link to={`/movies/${filmeId}`}> 
            <article className={styles.card}>
                <figure className='image-container'>
                    <img src={imageLink} alt="Imagem do banner do filme"></img>
                </figure>
            </article>
        </Link>
    )
}

export default MovieBanner;