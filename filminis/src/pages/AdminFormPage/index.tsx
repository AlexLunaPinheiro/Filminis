import styles from './AdminFormPage.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';


import AdminMovieForm from '../../components/AdminMovieForm';// (Vamos criar este)

function AdminFormPage(){
    return(
        <div className={styles.solicitationContainer}>
            <header>
                <Navbar variant="solid" /> {/* (Força a navbar sólida) */}
            </header>
            <main>
                <AdminMovieForm />
            </main>
            <Footer variant='min'/>
        </div>
    )
};

export default AdminFormPage;