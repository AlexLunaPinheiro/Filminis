import styles from './ActionMoviesCard.module.css';

type ActionMovieCardProps = {
  imageLink: string;
  titulo: string;
  duracao: string;
  variant?: 'grande' | 'pequeno';
};

function ActionMovieCard({ imageLink, titulo, duracao , variant = 'pequeno'}: ActionMovieCardProps) {
    const cardClass = variant === 'pequeno' ? styles.cardPequeno: styles.CardGrande;

  return (
    <article className={`${styles.cardBase} ${cardClass}`}>
      <figure className={styles.imageMovieCard}>
        <img src={imageLink} alt={`imagem do filme ${titulo}`} />
      </figure>

      <div className={styles.infoContainer}>
        <h1>{titulo}</h1>
        <div className={styles.desc}>
          <p>Duração</p>
          <p>{duracao}</p>
        </div>
      </div>
    </article>
  );
}

export default ActionMovieCard;
