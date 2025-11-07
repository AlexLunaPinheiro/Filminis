import styles from './HomeCarrossel.module.css'
import HomeCarrosselInfo from '../HomeCarrosselInfo';

type HomeCarrosselProps = {
  imageLink: string
};

function HomeCarrossel({imageLink}: HomeCarrosselProps) {
  return (
        <article className={styles.bannerCarrossel}>
          <figure>
            <img src={imageLink} alt="imagem do carrossel"></img>
          </figure>

          <HomeCarrosselInfo ano="2007" titulo="A origem" genero="Ficção científica"/> 
        </article>
        
  );
}

export default HomeCarrossel;
