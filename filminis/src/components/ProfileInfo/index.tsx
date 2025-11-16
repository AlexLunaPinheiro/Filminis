import styles from './Profile.module.css';
import SeparatedInput from '../SeparatedInput';
import LogoutButton from '../LogoutButton';

function ProfileInfo(){
    return(
        <div className={styles.profileInfoContainer}>
            <div className={styles.profileHeader}>
                <h1>Seus dados: </h1>
            </div>
            <div className={styles.profileForm}>
                <SeparatedInput label="Primeiro nome: " placeholder="sd" variant="profile"/>
                <SeparatedInput label="Sobrenome: " placeholder="sd" variant="profile"/>
                <SeparatedInput label="Telefone: " placeholder="sd" variant="profile"/>
                <SeparatedInput label="Email: " placeholder="sd" variant="profile"/>
                <SeparatedInput label="Senha: " placeholder="sd" variant="profile"/>
                <p>Todos os dados estão criptografados e são guardados em siigilo de acordo
com a Lei Geral de Proteção de Dados (LGPD) no artigo 1947 da constituição</p>
                <LogoutButton/>
            </div>
        </div>
    )
    
}

export default ProfileInfo;