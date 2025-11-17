import styles from './UserRequests.module.css';
import ActionButton from '../ActionButton';
import RequestsTable from '../RequestsTable'; 
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 1. Importar hooks
import { getMinhasSolicitacoes } from '../../services/interceptors/solicitacao_interceptor'; // 2. Importar interceptor
import type { SolicitacaoUsuario } from '../../services/interceptors/solicitacao_interceptor'; // 3. Importar tipo
import { useAuth } from '../../context/auth_context'; // 4. Importar useAuth

function UserRequests(){
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // 5. Verificar se está logado

    // 6. Estados para dados reais, loading e erro
    const [requests, setRequests] = useState<SolicitacaoUsuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 7. Buscar dados do backend quando o componente carregar
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
                {/* 8. Tratar erro */}
                {error && <div style={{ padding: '50px' }}><p style={{ color: 'red' }}>{error}</p></div>}
                
                {/* 9. Passar dados reais para a tabela */}
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