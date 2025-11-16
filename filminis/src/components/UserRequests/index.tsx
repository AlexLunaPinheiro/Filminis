import styles from './UserRequests.module.css';
import ActionButton from '../ActionButton';
import RequestsTable from '../RequestsTable'; 
import { useNavigate } from 'react-router-dom';

function UserRequests(){
    const navigate = useNavigate();

    const goToAddMovie = () => {
        navigate("/solicitation");
    };

    return(
        <div className={styles.userRequestsContainer}>
            <div className={styles.RequestsHeader}>
                <h1>Suas solicitações: </h1>
                
                <ActionButton 
                    text='Adicionar filme +' 
                    variant='create'
                    onClick={goToAddMovie}
                />
            </div>

            <div className={styles.requestsTable}>
                <RequestsTable />
            </div>
        </div>
    )
};

export default UserRequests;
