import styles from './ProfileNavigation.module.css';

type ProfileNavigationProps = {
    nome: string,
    email: string, 
    profileImage : string,
    activeView: 'info' | 'solicitacoes',
    setActiveView: (view: 'info' | 'solicitacoes') => void;
}

function ProfileNavigation({nome, email, profileImage, activeView, setActiveView}: ProfileNavigationProps){

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, view: 'info' | 'solicitacoes') => {
        e.preventDefault(); 
        setActiveView(view);
    };
    
    return(
        <aside className={styles.profileAside}>

            <section className={styles.profileInfo}>
                <figure>
                    <img src={profileImage} alt={`foto de perfil de ${nome}`}></img>
                </figure>
                <h2>{nome}</h2>
                <p>{email}</p>
            </section>

            <nav className={styles.profileNavigation}>
                <ul>
                    <li>
                         <a 
                            href="#" 
                            className={`${styles.navLink} ${activeView === 'info' ? styles.activeInfo : styles.inactive}`}
                            onClick={(e) => handleClick(e, 'info')}
                        >Informações do perfil</a>
                            
                    </li>
                    <li>
                       <a   
                            href="#" 
                            className={`${styles.navLink} ${activeView === 'solicitacoes' ? styles.activeSolicitacoes : styles.inactive}`}
                            onClick={(e) => handleClick(e, 'solicitacoes')}
                        >Solicitações</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
};

export default ProfileNavigation;