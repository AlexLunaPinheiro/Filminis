import styles from './HomeCarrosselInfo.module.css'
import Seta from '../../assets/icons/Seta.png'

type HomeCarrosselInfoProps = {
  ano: string;
  titulo: string;
  genero: string;
};

function HomeCarrosselInfo({ ano, titulo, genero}: HomeCarrosselInfoProps) {
  return (
        <article>
            <div className={styles.CarrosselInfo}>
                <p>{titulo} ({ano})</p>
                <p>{genero}</p>
            </div>

            <a href=''>VER MAIS
                <img src={Seta}></img>
            </a>

        </article>
        
  );
}

export default HomeCarrosselInfo;
