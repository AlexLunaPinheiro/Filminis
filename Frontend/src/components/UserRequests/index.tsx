import styles from './UserRequests.module.css';
import ActionButton from '../ActionButton';
import RequestsTable from '../RequestsTable'; 
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { getMinhasSolicitacoes } from '../../services/interceptors/solicitacao_interceptor'; 
import type { SolicitacaoUsuario } from '../../services/interceptors/solicitacao_interceptor'; 
import { useAuth } from '../../context/auth_context'; 

function UserRequests(){
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // Verificar se está logado

    // Estados para dados reais, loading e erro
    const [requests, setRequests] = useState<SolicitacaoUsuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Busca dados do backend quando o componente carregar
    useEffect(() => {
        if (!isLoggedIn) { // Não buscar se não estiver logado
            setError("Você precisa estar logado para ver suas solicitações.");
            setLoading(false);
            return;
        }

        async function loadRequests() {
            try {
                setLoading(true);
                setError(null);
                const data = await getMinhasSolicitacoes();
                setRequests(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadRequests();
    }, [isLoggedIn]); // Depende do status de login

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
                {error && <div><p>{error}</p></div>}
                
                {!error && (
                    <RequestsTable 
                        requests={requests}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    )
};

export default UserRequests;