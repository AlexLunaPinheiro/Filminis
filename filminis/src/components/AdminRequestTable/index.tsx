import { Link } from 'react-router-dom';
import styles from './AdminRequestTable.module.css';
import ActionButton from '../ActionButton';
import type { SolicitacaoAdmin } from '../../services/interceptors/admin_interceptor';
import { useState } from 'react';
import { reviewSolicitacao } from '../../services/interceptors/admin_interceptor';

type AdminRequestTableProps = {
    requests: SolicitacaoAdmin[];
    loading: boolean;
    onRefresh: () => void; 
}

function AdminRequestTable({ requests, loading, onRefresh }: AdminRequestTableProps) {
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // O 'loading' principal ainda pode ficar aqui,
    // pois a tabela inteira está carregando.
    if (loading) {
        return <p>Carregando solicitações...</p>;
    }

    // REMOVEMOS A VERIFICAÇÃO DE (requests.length === 0) DAQUI

    const handleReview = async (id: number, acao: 'APROVAR' | 'REJEITAR') => {
        setIsSubmitting(true);
        try {
            await reviewSolicitacao(id, acao);
            onRefresh(); 
        } catch (error: any) {
            alert(`Erro ao processar solicitação: ${error.message}`);
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        // 1. O container e o header agora SEMPRE serão renderizados
        <div className={styles.tableContainer}> 
            <div className={styles.tableHeader}>
                <h2>Registro de solicitações:</h2>
                <Link to="/admin/filmes/novo">
                    <ActionButton text='Adicionar filme +' variant='create'/>
                </Link>
            </div>

            {/* 2. A lógica condicional vai AQUI DENTRO */}
            {requests.length > 0 ? (
                // Se houver solicitações, mostre a tabela
                <div className={styles.tableScrollContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.headRow}> 
                                <th className={styles.th}>Data</th>
                                <th className={styles.th}>Filme</th>
                                <th className={styles.th}>Tipo</th>
                                <th className={styles.th}>Usuário</th>
                                <th className={styles.th}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(item => (
                                <tr key={item.id} className={styles.dataRow}> 
                                    <td className={styles.td}>{new Date(item.data_solicitacao).toLocaleDateString()}</td>
                                    <td className={styles.td}>{item.filme}</td>
                                    <td className={styles.td}>{item.tipo}</td>
                                    <td className={styles.td}>{item.usuario_nome}</td>
                                    <td className={`${styles.td} ${styles.actionButtons}`}>
                                        <ActionButton 
                                            text='Aprovar' 
                                            variant='create'
                                            onClick={() => handleReview(item.id, 'APROVAR')}
                                            disabled={isSubmitting}
                                        />
                                        <ActionButton 
                                            text='Desaprovar' 
                                            variant='delete'
                                            onClick={() => handleReview(item.id, 'REJEITAR')}
                                            disabled={isSubmitting}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Se NÃO houver solicitações, mostre a mensagem
                <div className={styles.emptyMessageContainer}>
                    <p>Nenhuma solicitação pendente encontrada.</p>
                </div>
            )}
        </div>
    );
}

export default AdminRequestTable;