import styles from './Profile.module.css';
import GenericInput from '../GenericInput';

function ProfileInfo(){
    return(
        <div className={styles.profileInfoContainer}>
            <div className={styles.profileHeader}>
                <h1>Seus dados: </h1>
            </div>
            <div className={styles.profileForm}>
                <GenericInput label="Primeiro nome: " placeholder="sd" variant="min" type='string'/>
            </div>
        </div>
    )
    
}

export default ProfileInfo;