import styles from './Footer.module.css';
import { Link} from 'react-router-dom';
import Instagram from '../../assets/icons/instagram.png';
import Facebook from '../../assets/icons/facebook.png';
import Linkedin from '../../assets/icons/linkedin.png'

type FooterProps = {
    variant: "min" | "max"
} 

function Footer({variant}:FooterProps){
    return(
        <footer className={`${styles.footer} ${styles[variant]}`}>
            <nav className={`${styles.footerNav} ${styles[variant]}`}>
                <ul>
                    <li>
                        <p>® 2025 MaguFlix. Todos os direitos reservados.</p>
                    </li>

                    <li>
                        <Link to="/about-us">
                                Sobre nós
                        </Link>
                    </li>

                    <li>
                        <Link to="/about-us">
                                Contato
                        </Link>
                    </li>

                    <li>
                        <section className={styles.socialMediaSection}>
                            <a href=''><img src={Facebook} alt='Facebook'></img></a>
                            <a href=''><img src={Linkedin} alt='Linkedin'></img></a>
                            <a href=''><img src={Instagram} alt='Instagram'></img></a>
                        </section>
                    </li>

                </ul>
            </nav>
        </footer>
    )
};

export default Footer;