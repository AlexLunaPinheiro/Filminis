import styles from './CastCard.module.css';

type CastCardProps = {
  imageLink: string;
  nome: string;
};

function CastCard({ imageLink, nome }: CastCardProps) {
  return (
    <article className={styles.card}>
      <figure className={styles.image}>
        <img src={imageLink} alt="Imagem do ator do filme" />
      </figure>

      <div className={styles.infoContainer}>
        <h1>{nome}</h1>
      </div>
    </article>
  );
}

export default CastCard;
