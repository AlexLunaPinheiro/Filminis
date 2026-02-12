import styles from './HomeCarrosselInfo.module.css'
import Seta from '../../assets/icons/Seta.png'
import { Link } from 'react-router-dom'; 

type HomeCarrosselInfoProps = {
    filmeId: number; 
    ano: string;
    titulo: string;
    genero: string;
};

function HomeCarrosselInfo({ filmeId, ano, titulo, genero}: HomeCarrosselInfoProps) {
    return (
        <article className={styles.CarrosselInfo}>
            <div className={styles.CarrosselInfoContainer}>
                <p>{titulo} ({ano})</p>
                <p>{genero}</p>
            </div>

            <Link to={`/movies/${filmeId}`}>
                VER MAIS
                <img src={Seta} alt="Seta"></img>
            </Link>

        </article>
        
    );
}

export default HomeCarrosselInfo;