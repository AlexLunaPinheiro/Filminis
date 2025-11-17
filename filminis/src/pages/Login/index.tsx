import { useEffect } from 'react'; // 1. Importar useEffect
import { useNavigate } from 'react-router-dom'; // 2. Importar useNavigate
import { useAuth } from '../../context/auth_context'; // 3. Importar useAuth
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/NavBar';
import styles from './Login.module.css';
import Footer from '../../components/Footer';

function LoginPage() {
  // 4. Pegue os dados de autenticação
  const { isLoggedIn, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // 5. Lógica de Redirecionamento
  useEffect(() => {
    // Se NÃO estiver carregando E estiver logado
    if (!isLoading && isLoggedIn) {
      if (user?.role === 'ADMIN') {
        navigate('/admin'); // Admin logado vai para o Dashboard
      } else {
        navigate('/profile'); // Usuário logado vai para o Perfil
      }
    }
  }, [isLoggedIn, isLoading, user, navigate]);

  // 6. Mostre "Carregando..." enquanto o AuthContext verifica o localStorage
  if (isLoading) {
    return (
      <div className={styles.loginContainer}>
        <header>
          <Navbar variant='solid'/>
        </header>
        <main className={styles.loginMain}> 
          <p style={{color: 'white', fontSize: '24px'}}>Verificando sessão...</p>
        </main>
        <Footer variant='min'/>
      </div>
    );
  }

  // 7. Se não estiver carregando E não estiver logado, mostre o login
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