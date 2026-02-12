import styles from './Solicitation.module.css';
import Navbar from '../../components/NavBar';
import SolicitationForm from '../../components/SolicitationForm';
import Footer from '../../components/Footer';

function Solicitation(){
    return(
        <div className={styles.solicitationContainer}>
            <header>
                <Navbar/>
            </header>
            <main>
                <SolicitationForm/>
            </main>
            <Footer variant='min'/>

        </div>
    )
};

export default Solicitation;