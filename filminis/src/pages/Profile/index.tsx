import { useState } from 'react'; 
import styles from './Profile.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileNavigation from '../../components/ProfileNavigation';
import DataShowTemplate from '../../components/DataShowTemaplate';
import ProfileInfo from '../../components/ProfileInfo';
import UserRequests from '../../components/UserRequests';

import Rodolfo from '../../assets/images/rodolfo.png'




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
                    {activeView === 'solicitacoes' && <UserRequests />}
                </DataShowTemplate>
                
            </main>
            <Footer variant='min'></Footer>
        </div>
    )
};

export default Profile;