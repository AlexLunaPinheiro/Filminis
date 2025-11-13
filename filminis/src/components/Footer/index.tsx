import styles from './Footer.module.css';
import { Link, useLocation } from 'react-router-dom';

type FooterProps = {
    variant: "min" | "max"
} 

function Footer({variant}:FooterProps){
    return(
        <footer className={`${styles[variant]}`}>
            <nav>
                <ul>
                    <li>
                        <p>® 2025 MaguFlix. Todos os direitos reservados.</p>
                    </li>

                    <li>
                        <Link to="/about-us">
                            <a>
                                Sobre nós
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link to="/about-us">
                            <a>
                                Contato
                            </a>
                        </Link>
                    </li>

                    <li>
                        <section>
                            <a href=''><img src='' alt='Facebook'></img></a>
                            <a href=''><img src='' alt='Linkedin'></img></a>
                            <a href=''><img src='' alt='Instagram'></img></a>
                        </section>
                    </li>

                </ul>
            </nav>
        </footer>
    )
};

export default Footer;