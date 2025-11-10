import styles from './MovieCard.module.css' // Importa como 'styles'

type MovieCardProps = {
    imageLink: string,
    title: string,
    produtora: string,
    ano: string
}

function MovieCard ({imageLink, title, produtora, ano}: MovieCardProps){
    return(
        <article className={styles.movieCard}>
            <figure>
                <img src={imageLink} alt={`Poster do filme ${title}`}></img>
            </figure>
            <div className={styles.infoContainer}>
                <h1>{title}</h1>
                <div className={styles.desc}>
                    <p>{produtora}</p>
                    <p>{ano}</p>
                </div>
            </div>
        </article>
    )
}

export default MovieCard;