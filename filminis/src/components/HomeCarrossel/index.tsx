import styles from './HomeCarrossel.module.css'
import HomeCarrosselInfo from '../HomeCarrosselInfo';

type HomeCarrosselProps = {
    imageLink: string;
    ano: string;
    titulo: string;
    genero: string;
};

function HomeCarrossel({imageLink, ano, titulo, genero}: HomeCarrosselProps) {
  return (
        <article className={styles.bannerCarrossel}>
            <figure>
                <img src={imageLink} alt={`Banner do filme ${titulo}`}></img>
            </figure>

            <HomeCarrosselInfo ano={ano} titulo={titulo} genero={genero}/> 
        </article>
        
  );
}

export default HomeCarrossel;