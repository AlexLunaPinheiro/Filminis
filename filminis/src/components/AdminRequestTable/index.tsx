import { Link } from 'react-router-dom';
import styles from './AdminRequestTable.module.css';
import ActionButton from '../ActionButton';

// Mock data (para visualização)
const mockRequests = [
    { id: 1, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 2, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 3, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 4, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 5, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 6, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 7, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
     { id: 4, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 5, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 6, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
    { id: 7, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', usuario: 'Alex Pinheiro' },
];

function AdminRequestTable() {
    
    const requests = mockRequests; 

    return (
        // (Este é o wrapper que você já tinha, com a borda)
        <div className={styles.tableContainer}> 
            <div className={styles.tableHeader}>
                <h2>Registro de solicitações:</h2>
                <Link to="/admin/filmes/novo">
                    <ActionButton text='Adicionar filme +' variant='create'/>
                </Link>
            </div>

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
                            // 3. MUDE A <tr> PARA USAR A CLASSE dataRow
                            <tr key={item.id} className={styles.dataRow}> 
                                <td className={styles.td}>{item.data}</td>
                                <td className={styles.td}>{item.filme}</td>
                                <td className={styles.td}>{item.tipo}</td>
                                <td className={styles.td}>{item.usuario}</td>
                                <td className={`${styles.td} ${styles.actionButtons}`}>
                                    <ActionButton text='Aprovar' variant='create'></ActionButton>
                                    <ActionButton text='Desaprovar' variant='delete'></ActionButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> {/* 4. FECHE O WRAPPER DE SCROLL */}
        </div>
    );
}

export default AdminRequestTable;