import styles from './UserIcon.module.css';
import rodolfo from '../../assets/images/rodolfo.png'; // Manter para fallback
import profileIcon from '../../assets/icons/User.png';
import { useAuth } from '../../context/auth_context'; // 1. Importar

// type User ... (REMOVER O TIPO E O ESTADO LOCAL)

function UserIcon() {
  const { user } = useAuth(); // 2. Usar o contexto

  // const [user, setUser] = useState<User>(null); // REMOVER
  // const handleLogin = () => ... // REMOVER

  return (
    <div className={styles.profileContainer}>
      {/* 3. Use o 'user' do contexto */}
      {user ? ( 
        <figure>
          {/* O backend não nos dá a foto do usuário ainda, então usamos a padrão */}
          <img src={rodolfo} alt={user.nome} />
        </figure>
      ) : (
        <div className={styles.profileIcon}>
          <img src={profileIcon} alt="Icone de perfil"></img>
        </div>
      )}
    </div>
  );
}

export default UserIcon;