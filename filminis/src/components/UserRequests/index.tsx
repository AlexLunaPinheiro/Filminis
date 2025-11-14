import styles from './UserRequests.module.css';
import ActionButton from '../ActionButton';
import RequestsTable from '../RequestsTable'; 

function UserRequests(){
    return(
        <div className={styles.userRequestsContainer}>
            <div className={styles.RequestsHeader}>
                <h1>Suas solicitações: </h1>
                <ActionButton text='Adicionar filme +' variant='create'/>
            </div>
            <div className={styles.requestsTable}>
                <RequestsTable />
            </div>
        </div>
    )
};

export default UserRequests;