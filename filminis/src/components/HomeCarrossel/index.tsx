import styles from './HomeCarrossel.module.css'
import HomeCarrosselInfo from '../HomeCarrosselInfo';

type HomeCarrosselProps = {
    filmeId: number; 
    imageLink: string;
    ano: string;
    titulo: string;
    genero: string;
};

function HomeCarrossel({filmeId, imageLink, ano, titulo, genero}: HomeCarrosselProps) {
  return (
        <article className={styles.bannerCarrossel}>
            <figure>
                <img src={imageLink} alt={`Banner do filme ${titulo}`}></img>
            </figure>

            <HomeCarrosselInfo 
                filmeId={filmeId} 
                ano={ano} 
                titulo={titulo} 
                genero={genero}
            /> 
        </article>
        
  );
}

export default HomeCarrossel;