import styles from './LogoutButton.module.css';
import Sair from '../../assets/icons/Sair.png';
import { useAuth } from '../../context/auth_context'; // 1. Importar
import { useNavigate } from 'react-router-dom';

function LogoutButton(){
    const auth = useAuth(); // 2. Usar o contexto
    const navigate = useNavigate();

    const handleLogout = () => {
      auth.logout(); // 3. Chamar a função de logout
      navigate('/'); // 4. Redirecionar para a Home
    };

    return(
        <button className={styles.logoutButton} onClick={handleLogout}>
            LOGOUT
            <img src={Sair} alt="Sair"></img>
        </button>
    )
}

export default LogoutButton;