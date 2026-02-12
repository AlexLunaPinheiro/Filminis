import styles from './RequestsTable.module.css';
import Chips from '../Chips';

import type { SolicitacaoUsuario } from '../../services/interceptors/solicitacao_interceptor';


type RequestsTableProps = {
  requests: SolicitacaoUsuario[];
  loading: boolean;
};

const statusMap: Record<string, 'approved' | 'disapproved' | 'waiting'> = {
    'Aprovado': 'approved',
    'Reprovado': 'disapproved',
    'Desaprovado': 'disapproved', 
    'Em análise': 'waiting',
};

function RequestsTable({ requests, loading }: RequestsTableProps) { 

    if (loading) {
        return <p>Carregando solicitações...</p>;
    }

    if (requests.length === 0 && !loading) {
        return <p>Você ainda não fez nenhuma solicitação.</p>;
    }

    return (
        <div className={styles.tableBorderWrapper}>
            <div className={styles.tableScrollContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.headRow}>

                            <th className={styles.th}>Data</th>
                            <th className={styles.th}>Filme</th>
                            <th className={styles.th}>Tipo</th>
                            <th className={styles.th}>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => ( 
                            <tr key={request.id} className={styles.dataRow}>

                                <td className={styles.td}>{new Date(request.data_solicitacao).toLocaleDateString()}</td>
                                <td className={styles.td}>{request.filme}</td>
                                <td className={styles.td}>{request.tipo === 'ADICAO' ? 'Adição' : 'Edição'}</td>
                                <td className={styles.td}>

                                    <Chips 
                                        text={request.status}
                                        variant={statusMap[request.status] || 'waiting'}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RequestsTable;