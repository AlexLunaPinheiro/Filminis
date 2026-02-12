import styles from './AdminFormPage.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';


import AdminMovieForm from '../../components/AdminMovieForm';

function AdminFormPage(){
    return(
        <div className={styles.solicitationContainer}>
            <header>
                <Navbar variant="solid" /> 
            </header>
            <main>
                <AdminMovieForm />
            </main>
            <Footer variant='min'/>
        </div>
    )
};

export default AdminFormPage;