import { useEffect } from 'react'; // 1. Importar useEffect
import { useNavigate } from 'react-router-dom'; // 2. Importar useNavigate
import { useAuth } from '../../context/auth_context'; // 3. Importar useAuth
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/NavBar';
import styles from './Login.module.css';
import Footer from '../../components/Footer';

function LoginPage() {
  // dados de autenticação
  const { isLoggedIn, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Lógica de Redirecionamento
  useEffect(() => {
    // Se não estiver carregando E estiver logado
    if (!isLoading && isLoggedIn) {
      if (user?.role === 'ADMIN') {
        navigate('/admin'); // Admin logado vai para o Dashboard
      } else {
        navigate('/profile'); // Usuário logado vai para o Perfil
      }
    }
  }, [isLoggedIn, isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className={styles.loginContainer}>
        <header>
          <Navbar variant='solid'/>
        </header>
        <main className={styles.loginMain}> 
          <p>Verificando sessão...</p>
        </main>
        <Footer variant='min'/>
      </div>
    );
  }

  // Se não estiver carregando E não estiver logado, mostra o login
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