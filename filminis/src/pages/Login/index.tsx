import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/NavBar';
import styles from './Login.module.css';

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <header>
        <Navbar variant='solid'/>
      </header>
    <main className={styles.loginMain}> 
        <LoginForm />
    </main>
    </div>
    
  );
};

export default LoginPage;
