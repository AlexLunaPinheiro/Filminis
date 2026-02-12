import styles from './Profile.module.css'; // (Seu CSS)
import SeparatedInput from '../SeparatedInput';
import LogoutButton from '../LogoutButton';
// import { useState, useEffect } from 'react'; // REMOVER
// import { getMyProfile } from '../../services/interceptors/auth.interceptor'; // REMOVER

// 1. Importar o tipo (pode ser do interceptor ou local)
import type { UserProfileData } from '../../services/interceptors/auth_interceptor';

// 2. Definir as props que o componente agora recebe
type ProfileInfoProps = {
    profileData: UserProfileData | null;
    loading: boolean;
};

// 3. Receber as props
function ProfileInfo({ profileData, loading }: ProfileInfoProps) {
    // 4. Remover toda a lógica de useState, useEffect, loading e error daqui

    // 5. Lidar com os estados de loading (vindos do pai)
    if (loading) {
        return (
            <div className={styles.profileInfoContainer}>
                <div className={styles.profileHeader}><h1>Carregando...</h1></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className={styles.profileInfoContainer}>
                <div className={styles.profileHeader}><h1>Não foi possível carregar os dados.</h1></div>
            </div>
        );
    }

    return(
        <div className={styles.profileInfoContainer}>
            <div className={styles.profileHeader}>
                <h1>Seus dados: </h1>
            </div>
            <div className={styles.profileForm}>
                {/* 6. Usar os dados das props */}
                <SeparatedInput 
                    label="Primeiro nome: " 
                    placeholder="Seu nome" 
                    variant="profile"
                    value={profileData.nome || ''}
                    readOnly 
                />
                <SeparatedInput 
                    label="Sobrenome: " 
                    placeholder="Seu sobrenome" 
                    variant="profile"
                    value={profileData.sobrenome || ''}
                    readOnly
                />
                <SeparatedInput 
                    label="Telefone: " 
                    placeholder="(Não disponível)" 
                    variant="profile"
                    readOnly
                />
                <SeparatedInput 
                    label="Email: " 
                    placeholder="Seu email" 
                    variant="profile"
                    value={profileData.email || ''}
                    readOnly
                />
                <SeparatedInput 
                    label="Senha: " 
                    placeholder="********" 
                    variant="profile" 
                    type="password"
                    readOnly
                />
                <p>Todos os dados estão criptografados e são guardados em sigilo de acordo
com a Lei Geral de Proteção de Dados (LGPD) no artigo 1947 da constituição</p>
                <LogoutButton/>
            </div>
        </div>
    )
}

export default ProfileInfo;