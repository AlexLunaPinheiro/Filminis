import styles from './LogoutButton.module.css';
import Sair from '../../assets/icons/Sair.png'

function LogoutButton(){
    return(
        <button className={styles.logoutButton}>
            LOGOUT
            <img src={Sair}></img>
        </button>
    )
}

export default LogoutButton;