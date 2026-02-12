import { useState , useEffect } from 'react'; 
import { useLocation, useNavigate } from "react-router-dom"; // Importar useNavigate
import styles from './Profile.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileNavigation from '../../components/ProfileNavigation';
import DataShowTemplate from '../../components/DataShowTemaplate';
import ProfileInfo from '../../components/ProfileInfo';
import Rodolfo from '../../assets/images/rodolfo.png'; 
import UserRequests from '../../components/UserRequests';
import { useAuth } from '../../context/auth_context'; 

import { getMyProfile } from '../../services/interceptors/auth_interceptor';
import type { UserProfileData } from '../../services/interceptors/auth_interceptor'; 

function Profile(){
    const location = useLocation();
    const navigate = useNavigate();
    const stateView = location.state?.activeView;
    const { user, isLoggedIn } = useAuth(); // 2. Pegar dados básicos do login

    const [activeView, setActiveView] = useState<'info' | 'solicitacoes'>(
        stateView || 'info'
    );

    // estado para os dados completos do perfil
    const [profileData, setProfileData] = useState<UserProfileData | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    // rota protegido
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // Se não está logado, vai pro login
            return; // Para a execução
        }

        // Se está logado, buscar dados do perfil
        async function loadProfile() {
            try {
                const data = await getMyProfile();
                setProfileData(data);
            } catch (err) {
                console.error("Erro ao buscar perfil:", err);
            } finally {
                setLoadingProfile(false);
            }
        }
        
        loadProfile();
    }, [isLoggedIn, navigate]); // Depende do status de login

    useEffect(() => {
        if (stateView === 'solicitacoes') {
            setActiveView('solicitacoes');
        }
    }, [stateView]);

    //  Lida com usuário não logado ou carregando
    if (!user || loadingProfile) {
        return (
            <div className={styles.profileContainer}>
                <header>
                    <Navbar variant='solid'/>
                </header>
                <main className={styles.profileMain}>
                    <p>Carregando perfil...</p>
                </main>
                <Footer variant='min'></Footer>
            </div>
        );
    }
    

    return(
        <div className={styles.profileContainer}>
            <header>
                <Navbar variant='solid'/>
            </header>
            <main className={styles.profileMain}>
                <ProfileNavigation 
                    nome={`${profileData?.nome || user.nome} ${profileData?.sobrenome || ''}`} 
                    email={profileData?.email || 'Carregando email...'}
                    profileImage={Rodolfo} 
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
                <DataShowTemplate>
                    {activeView === 'info' && <ProfileInfo profileData={profileData} loading={loadingProfile} />}
                    {activeView === 'solicitacoes' && <UserRequests />}
                </DataShowTemplate>
            </main>
            <Footer variant='min'></Footer>
        </div>
    )
};

export default Profile;