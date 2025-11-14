import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/NavBar';
import styles from './Login.module.css';
import Footer from '../../components/Footer';

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <header>
        <Navbar variant='solid'/>
      </header>
    <main className={styles.loginMain}> 
        <LoginForm />
    </main>
    <Footer variant='min'/>
    </div>
    
  );
};

export default LoginPage;
