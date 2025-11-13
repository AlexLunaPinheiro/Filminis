import { useState } from 'react';
import styles from './UserIcon.module.css';
import rodolfo from '../../assets/images/rodolfo.png';
import profileIcon from '../../assets/icons/User.png'

type User = {
  name: string;
  photo: string;
} | null;

function UserIcon() {
  const [user, setUser] = useState<User>(null);

  const handleLogin = () => {
    setUser({
      name: "Alex",
      photo: rodolfo
    });
  };
  

  return (
    <div className={styles.profileContainer}>
      {user ? (
        <figure>
          <img src={user.photo} alt={user.name} />
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
