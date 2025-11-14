import { useState } from 'react'; // 1. Importe o useState
import styles from './Profile.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileNavigation from '../../components/ProfileNavigation';
import DataShowTemplate from '../../components/DataShowTemaplate';
import ProfileInfo from '../../components/ProfileInfo';

import Rodolfo from '../../assets/images/rodolfo.png'

const InformacoesDoPerfil = () => (
    <div style={{ padding: '20px', background: '#222', borderRadius: '8px' }}>
        <h2>Formulário de Informações</h2>
    </div>
);

const SolicitacoesDoUsuario = () => (
    <div style={{ padding: '20px', background: '#222', borderRadius: '8px' }}>
        <h2>Tabela de Solicitações</h2>
    </div>
);


function Profile(){
    const [activeView, setActiveView] = useState<'info' | 'solicitacoes'>('info');

    return(
        <div className={styles.profileContainer}>
            <header>
                <Navbar variant='solid'/>
            </header>
            <main className={styles.profileMain}>
                <ProfileNavigation 
                    nome='Alex pinheiro' 
                    email='alexlp2k6@gmail.com' 
                    profileImage={Rodolfo}
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
                <DataShowTemplate>
                    {activeView === 'info' && <ProfileInfo />}
                    {activeView === 'solicitacoes' && <SolicitacoesDoUsuario />}
                </DataShowTemplate>
                
            </main>
            <Footer variant='min'></Footer>
        </div>
    )
};

export default Profile;