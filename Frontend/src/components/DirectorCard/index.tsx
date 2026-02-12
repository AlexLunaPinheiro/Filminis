import styles from './DirectorCard.module.css'

type DirectorCardProps = {
  imageLink: string;
  nome: string;
};

function DirectorCard({ imageLink, nome}: DirectorCardProps) {
  return (
    <article className={styles.card}>
      <figure className={styles.image}>
        <img src={imageLink} alt="Imagem do ator do filme" />
      </figure>

      <div className={styles.infoContainer}>
        <h1>{nome}</h1>
        <p>Diretor</p>
      </div>

    </article>
  );
}

export default DirectorCard;
